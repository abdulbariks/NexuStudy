import { useQuery, useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { AuthContext } from "../../contexts/AuthContext";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const StudySessionDetails = () => {
  useTitle("Study Session Details | NexuStudy ");
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();

  const [isOpen, setIsOpen, refetch] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const { data: session = {}, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/session/${id}`);
      return res.data;
    },
  });

  const { data: material = {} } = useQuery({
    queryKey: ["material", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/session/${id}`);
      return res.data;
    },
  });

  console.log(material);

  const mutation = useMutation({
    mutationFn: async (orderData) => {
      const res = await axiosSecure.post("/booked-session", orderData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({ icon: "success", title: "Session Booked Successfully" });
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "You have already booked this session.",
        });
      } else {
        Swal.fire({ icon: "error", title: "Failed to submit Session" });
      }
    },
  });

  const { data: bookedSession } = useQuery({
    queryKey: ["user-review", id, user?.email],
    enabled: !!user, // only fetch if user is logged in
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked-session`, {
        params: { sessionId: id, studentEmail: user.email },
      });
      return res.data;
    },
  });

  console.log("bookedSession bookedSession", bookedSession?.sessionId === !id);

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  const { averageRating } = reviews;

  if (isRoleLoading) return <Loading />;
  const isRegistrationOpen = (start, end) => {
    return dayjs().isAfter(dayjs(start)) && dayjs().isBefore(dayjs(end));
  };

  if (isLoading) {
    return <Loading />;
  }

  const {
    title,
    description,
    tutorName,
    tutorEmail,
    registrationFee,
    registrationStart,
    registrationEnd,
    classStart,
    classEnd,
    duration,
    status,
  } = session;

  const registrationOpen = isRegistrationOpen(
    registrationStart,
    registrationEnd
  );

  const submitPurchase = (e) => {
    e.preventDefault();
    mutation.mutate({
      sessionId: id,
      title,
      registrationFee,
      tutorName,
      tutorEmail,
      studentName: user?.displayName,
      studentEmail: user?.email,
    });
  };

  const isBookDisabled =
    !user ||
    role === "admin" ||
    role === "tutor" ||
    !registrationOpen ||
    bookedSession?.sessionId === id;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-6 pt-20">
      <h2 className="text-2xl font-bold text-indigo-500  mb-3">{title}</h2>
      <p className="text-gray-700 text-sm mb-4">{description}</p>

      <ul className="text-sm text-gray-700 space-y-2 mb-6">
        <li>
          <strong>Tutor:</strong> {tutorName}
        </li>
        <li>
          <strong>Email:</strong> {tutorEmail}
        </li>
        <li>
          <strong>Fee:</strong>{" "}
          {registrationFee > 0 ? `${registrationFee}` : "Free"}
        </li>
        <li>
          <strong>Registration:</strong> {registrationStart} ➝ {registrationEnd}
        </li>
        <li>
          <strong>Class Period:</strong> {classStart} ➝ {classEnd}
        </li>
        <li>
          <strong>Duration:</strong> {duration} days
        </li>
        <li>
          <strong>Status:</strong> {status}
        </li>
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            <strong>Reviews:</strong> No reviews yet.
          </p>
        ) : (
          <li className=" text-sm">
            <strong>Reviews:</strong> ⭐⭐⭐⭐☆ ({averageRating} avg)
          </li>
        )}
      </ul>
      {registrationFee > 0 ? (
        <button
          disabled={isBookDisabled}
          onClick={() => setIsOpen(true)}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            isBookDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500  hover:bg-indigo-700"
          }`}
        >
          {registrationOpen
            ? `Book Now ${registrationFee} /=`
            : "Registration Closed"}
          <PurchaseModal
            session={session}
            closeModal={closeModal}
            isOpen={isOpen}
            fetchSession={refetch}
          />
        </button>
      ) : (
        <button
          disabled={isBookDisabled}
          onClick={submitPurchase}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            isBookDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500  hover:bg-indigo-700 "
          }`}
        >
          {registrationOpen ? "Book Now Free" : "Registration Closed"}
        </button>
      )}
    </div>
  );
};

export default StudySessionDetails;
