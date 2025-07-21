# 📚 NexuStudy - Collaborative Study Platform

NexuStudy is a full-featured collaborative study platform that connects students, tutors, and administrators to streamline session scheduling, resource sharing, and user management. It’s designed to enhance educational collaboration, accessibility to study materials, and efficient session management.

---

## 🚀 Objective

The goal is to implement a multi-role educational platform with modern authentication, authorization, and rich user experiences. The system supports:

- 🧑‍🎓 Student learning and resource access
- 👩‍🏫 Tutor session management and material uploads
- 🧑‍💼 Admin moderation and analytics

---

## 🔐 Authentication & Authorization

- **User Roles**: Student (default), Tutor, Admin
- **User Registration**: Name, Email, Password, Role (Student by default)
- **User Login**: JWT-based session authentication
- **Social Login**: Google or GitHub (auto-assigns student role)
- **Role-Based Access Control**: Protected routes for each role
- **JWT Storage**: LocalStorage or Cookies (your choice)

---

## 🏠 Home Page

- Responsive design with 5 sections:

  - Navbar
  - Banner with professional image
  - Available Study Sessions (only approved)
  - Two meaningful extra sections
  - Footer

- **Navbar Behavior**:
  - If not logged in: shows Login & Signup
  - If logged in: shows Profile Pic, Dashboard, Logout

---

## 📄 Pages & Features

### 🔍 Study Sessions Page

- Display all **approved** study sessions in card layout
- Show session status: `Ongoing` or `Closed` based on date
- Each session includes:
  - Title, Description, Status, Read More button

### 📑 Study Session Details Page

Displays:

- Session Info: Title, Tutor, Description, Duration, Dates, Fee, Status
- Ratings (average), Reviews (filtered by session ID)
- **Book Now** button (disabled for tutors/admin or expired sessions)

**Booking Behavior**:

- If session is free (fee = 0): auto-book
- If paid: redirects to payment page

> On success: Save booking with student email, tutor email, and session ID in `bookedSessions` collection

---

## 🧑‍🎓 Student Dashboard (Private)

### Routes:

1. **View Booked Sessions**

   - View list
   - Click to view details
   - Submit a review (with rating)

2. **Create Note**

   - Form: Email (readonly), Title, Description

3. **Manage Notes**

   - View all notes
   - Update/Delete functionality

4. **View Study Materials**
   - Filter by booked session
   - View/download image
   - Open Google Drive link

---

## 👩‍🏫 Tutor Dashboard (Private)

### Routes:

1. **Create Study Session**

   - Form with session details (fee & status fixed)

2. **View All Study Sessions**

   - See approved/rejected sessions
   - Re-request approval for rejected sessions

3. **Upload Materials**

   - Upload image & Google Drive link for a specific session

4. **View All Materials**
   - List uploaded resources
   - Update/Delete options

---

## 🧑‍💼 Admin Dashboard (Private)

### Routes:

1. **View All Users**

   - Search by name/email (backend search)
   - Change role

2. **View All Study Sessions**

   - Approve or Reject sessions
     - If approve: show modal to input fee (0 = free)
     - If reject: show modal for rejection reason/feedback
   - Update/Delete buttons for approved sessions only

3. **View All Materials**
   - Remove outdated/inappropriate content

---

## 💡 Bonus Features (Optional)

- 🔄 Axios Interceptor for secure request headers
- 📢 Admin Announcements
  - Public page to view announcements
  - Admin dashboard route to post
- 👥 View classmates (students in the same session)

---

## 🧠 Technical Highlights

- **React + TailwindCSS**
- **Express.js Backend with MongoDB**
- **JWT Authentication**
- **React Router & Private Routes**
- **TanStack Query** (used for all GET requests)
- **SweetAlert2 for modals and feedback**
- **Stripe** for paid session booking

---

## 📈 Challenge Requirements

- ✅ JWT Authentication for email/password and social login
- ✅ TanStack Query for all GET requests
- ✅ Role-Based Access Control
- ✅ Pagination (at least 2 pages)
- ✅ Rejection feedback with admin–tutor feedback loop
- ✅ Session booking with payment or direct booking for free sessions

---

## 📁 Collections Structure (MongoDB)

- `users`: All user info
- `studySessions`: Session data (status: pending, approved, rejected)
- `bookedSessions`: Info of booked study sessions
- `materials`: Images and Google Drive links
- `reviews`: Ratings and reviews from students
- `notes`: Personal notes by students
- `announcements`: Optional admin posts

---

## 🛠️ Setup Instructions

```bash
# Clone repo
git clone https://github.com/abdulbariks/NexuStudy

# Backend setup
cd server
npm install
npm run dev

# Frontend setup
cd client
npm install
npm run dev
```
