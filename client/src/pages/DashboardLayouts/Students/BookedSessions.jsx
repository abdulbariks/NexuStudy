import React from "react";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import StudentReview from "../../../components/Dashboard/StudentReview";

const BookedSessions = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  //   console.log(id);

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

  const { data: session = {}, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/session/${id}`);
      return res.data;
    },
  });

  console.log(id);

  const { data: materials = [], isError } = useQuery({
    queryKey: ["materials", id],
    queryFn: async () => {
      const res = await axiosSecure.get("/session-materials", {
        params: { sessionId: id },
      });
      return res.data;
    },
    enabled: !!id,
  });
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load materials.
      </p>
    );
  console.log("mataaaaaaa", materials);

  //   console.log(session);

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

  if (isLoading) return <Loading />;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Left: Session Info */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-3">{title}</h2>
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
            <strong>Registration:</strong> {registrationStart} ➝{" "}
            {registrationEnd}
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
          <StudentReview id={id} />
        </ul>
      </div>

      {/* Right: Study Materials */}
      <div className="w-full">
        {materials.length === 0 ? (
          <p className="text-center text-4xl text-gray-500">
            No materials found.
          </p>
        ) : (
          <div className="px-4 py-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Session Materials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {materials.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Uploaded:{" "}
                      <span className="font-medium">
                        {new Date(item.uploadedAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-blue-600 text-white text-sm py-2 px-4 rounded text-center hover:bg-blue-700"
                  >
                    View Resource
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedSessions;
