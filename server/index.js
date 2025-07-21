const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");

// Load environment variables from .env file
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

const decodedKey = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf8"
);
const serviceAccount = JSON.parse(decodedKey);
// console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9uorkol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("assignmentDB"); // database name
    const usersCollection = db.collection("users");
    const notesCollection = db.collection("notes");
    const sessionsCollection = db.collection("sessions");
    const BookingCollection = db.collection("bookings");
    const reviewsCollection = db.collection("reviews");
    const blogsCollection = db.collection("blogs");
    const MaterialCollection = db.collection("materials");

    // custom middlewares
    const verifyFBToken = async (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      // verify the token
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.decoded = decoded;
        next();
      } catch (error) {
        return res.status(403).send({ message: "forbidden access" });
      }
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      if (!user || user.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    const verifyTutor = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      if (!user || user.role !== "tutor") {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // get all users for admin
    app.get("/users", async (req, res) => {
      const filter = {
        email: {
          $ne: req?.user?.email,
        },
      };
      const result = await usersCollection.find(filter).toArray();
      res.send(result);
    });

    // get a users role
    app.get("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      if (!result) return res.status(404).send({ message: "User Not Found." });
      res.send({ role: result?.role });
    });

    // Users Create
    app.post("/users", async (req, res) => {
      const userData = req.body;
      userData.role = "student";
      userData.created_at = new Date().toISOString();
      userData.last_loggedIn = new Date().toISOString();
      const query = {
        email: userData?.email,
      };
      const alreadyExists = await usersCollection.findOne(query);
      if (!!alreadyExists) {
        const result = await usersCollection.updateOne(query, {
          $set: { last_loggedIn: new Date().toISOString() },
        });
        return res.send(result);
      }
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    // Update users Role
    app.patch("/user/role/update/:email", async (req, res) => {
      const email = req.params.email;
      const { role } = req.body;
      const filter = { email: email };
      const updateDoc = {
        $set: {
          role,
          status: "verified",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      console.log(result);
      res.send(result);
    });

    // Student Create note
    app.post("/create-note", async (req, res) => {
      const note = req.body;
      const result = await notesCollection.insertOne(note);
      res.send(result);
    });
    // Student get note
    app.get("/notes", async (req, res) => {
      const email = req.query.email;
      const notes = await notesCollection.find({ email }).toArray();
      res.send(notes);
    });
    // Student update note
    app.patch("/notes/:id", async (req, res) => {
      const { title, description } = req.body;
      const result = await notesCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { title, description } }
      );
      res.send(result);
    });
    // Student delete note
    app.delete("/notes/:id", async (req, res) => {
      const result = await notesCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // Become tutor request
    app.patch("/become-tutor-request/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: {
          status: "requested",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // POST: Create a new Session
    app.post("/sessions", async (req, res) => {
      try {
        const newSession = req.body;
        const result = await sessionsCollection.insertOne(newSession);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error inserting session:", error);
        res.status(500).send({ message: "Failed to create session" });
      }
    });

    // create payment intent for Session
    app.post("/create-payment-intent", async (req, res) => {
      const { sessionId } = req.body;
      const session = await sessionsCollection.findOne({
        _id: new ObjectId(sessionId),
      });
      console.log(session);

      if (!session)
        return res.status(404).send({ message: "Session Not Found" });
      const price = parseInt(session.registrationFee);
      const totalPrice = 1000 + price * 100;
      console.log(price, totalPrice);

      // stripe...
      const { client_secret } = await stripe.paymentIntents.create({
        amount: totalPrice,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({ clientSecret: client_secret });
    });

    // save Session data in BookingCollection in db
    app.post("/booked-session", async (req, res) => {
      const bookingData = req.body;
      const { sessionId, studentEmail } = bookingData;
      // Check if user already reviewed this session
      const existingSession = await BookingCollection.findOne({
        sessionId,
        studentEmail,
      });

      if (existingSession) {
        return res.status(409).send({
          message: "You already booked this session.",
        });
      }
      const result = await BookingCollection.insertOne(bookingData);
      res.send(result);
    });

    app.get("/booked-sessionss", async (req, res) => {
      const email = req.params.email;

      if (!email) {
        return res
          .status(400)
          .send({ message: "Missing sessionId or userEmail" });
      }

      const existingSession = await BookingCollection.findOne({
        email,
      });

      if (!existingSession) {
        return res.status(404).send({ message: "booked session not found" });
      }

      res.send(existingSession);
    });

    // get all booked-session info for student
    app.get("/booked-session", async (req, res) => {
      const { studentEmail } = req.query;

      if (!studentEmail) {
        return res.status(400).send({ message: "Missing studentEmail" });
      }

      try {
        const filter = { studentEmail };
        const result = await BookingCollection.find(filter).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching booked sessions:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // get All Sessions
    app.get("/all-sessions", async (req, res) => {
      try {
        const result = await sessionsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Failed to fetch approved sessions:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });
    app.get("/sessions", async (req, res) => {
      try {
        const result = await sessionsCollection
          .find({ status: "approved" })
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Failed to fetch approved sessions:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });
    // update admin sessions
    app.patch("/admin-session/:id", async (req, res) => {
      const { status, registrationFee } = req.body;
      const result = await sessionsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        {
          $set: {
            status,
            registrationFee,
          },
        }
      );
      res.send(result);
    });

    // get single Sessions
    app.get("/session/:id", async (req, res) => {
      const id = req.params.id;
      const result = await sessionsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // get tutor-sessions
    app.get("/tutor-sessions", async (req, res) => {
      const tutorEmail = req.query.email;
      const sessions = await sessionsCollection.find({ tutorEmail }).toArray();
      res.send(sessions);
    });
    // update tutor-sessions
    app.patch("/tutor-session/:id", async (req, res) => {
      const {
        title,
        description,
        registrationStart,
        registrationEnd,
        classStart,
        classEnd,
        duration,
      } = req.body;
      const result = await sessionsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        {
          $set: {
            title,
            description,
            registrationStart,
            registrationEnd,
            classStart,
            classEnd,
            duration,
          },
        }
      );
      res.send(result);
    });
    // delete tutor-sessions
    app.delete("/tutor-session/:id", async (req, res) => {
      const result = await sessionsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // get review
    app.get("/reviews/:sessionId", async (req, res) => {
      const { sessionId } = req.params;

      if (!sessionId) {
        return res.status(400).send({ message: "Missing sessionId" });
      }

      try {
        const aggregation = await reviewsCollection
          .aggregate([
            { $match: { sessionId } },
            {
              $group: {
                _id: "$sessionId",
                totalRating: { $sum: "$rating" },
                averageRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 },
              },
            },
          ])
          .toArray();

        if (aggregation.length === 0) {
          return res.status(404).send({ message: "No reviews found." });
        }

        res.send(aggregation[0]);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error retrieving review data", error });
      }
    });
    // POST a new review
    app.post("/reviews", async (req, res) => {
      const { sessionId, userEmail, rating } = req.body;

      if (!sessionId || !userEmail || !rating) {
        return res.status(400).send({ message: "Missing required fields" });
      }

      // Check if user already reviewed this session
      const existingReview = await reviewsCollection.findOne({
        sessionId,
        userEmail,
      });

      if (existingReview) {
        return res.status(409).send({
          message: "You already submitted a review for this session.",
        });
      }

      const newReview = {
        sessionId,
        userEmail,
        rating: parseInt(rating),
      };

      const result = await reviewsCollection.insertOne(newReview);
      res.send(result);
    });

    // upload-material
    app.post("/upload-material", async (req, res) => {
      const material = req.body;
      const result = await MaterialCollection.insertOne(material);
      res.send(result);
    });

    // get material Session for booked session
    app.get("/session-materials", async (req, res) => {
      const { sessionId } = req.query;
      console.log(sessionId);

      if (!sessionId) {
        return res.status(400).send({ message: "Missing sessionId" });
      }

      try {
        const filter = { sessionId };
        const result = await MaterialCollection.find(filter).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching booked Material:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // get material tutor
    app.get("/materials", async (req, res) => {
      const { tutorEmail } = req.query;

      if (!tutorEmail) {
        return res.status(400).send({ message: "Missing tutorEmail" });
      }

      try {
        const filter = { tutorEmail };
        const materials = await MaterialCollection.find(filter).toArray();
        res.send(materials);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
      }
    });

    // get material for admin
    app.get("/admin-materials", async (req, res) => {
      const result = await MaterialCollection.find().toArray();
      res.send(result);
    });

    // delete material for admin
    app.delete("/admin-materials/:id", async (req, res) => {
      const result = await MaterialCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // Create Blogs
    app.post("/create-blog", async (req, res) => {
      try {
        const newblog = req.body;
        console.log(newblog);

        const result = await blogsCollection.insertOne(newblog);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error inserting session:", error);
        res.status(500).send({ message: "Failed to create session" });
      }
    });
    // get Blogs
    app.get("/create-blog", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });

    // stats
    app.get("/stats", async (req, res) => {
      const totalUser = await usersCollection.estimatedDocumentCount();
      const totalSession = await sessionsCollection.estimatedDocumentCount();
      const totalBooking = await BookingCollection.estimatedDocumentCount();
      const totalBlog = await blogsCollection.estimatedDocumentCount();
      res.send({
        totalUser,
        totalSession,
        totalBooking,
        totalBlog,
      });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
