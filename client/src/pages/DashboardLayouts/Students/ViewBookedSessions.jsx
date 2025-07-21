import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewBookedSessions = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 6;

  const {
    data: bookedSessions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booked-session", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/booked-session", {
        params: { studentEmail: user?.email },
      });
      return res.data || [];
    },
    enabled: !!user?.email,
  });
  console.log(bookedSessions);

  if (isLoading)
    return <p className="text-center mt-10">Loading sessions...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load booked sessions.
      </p>
    );

  if (bookedSessions.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        You haven't booked any sessions yet.
      </p>
    );

  // Pagination logic
  const totalPages = Math.ceil(bookedSessions.length / sessionsPerPage);
  const startIndex = (currentPage - 1) * sessionsPerPage;
  const currentSessions = bookedSessions.slice(
    startIndex,
    startIndex + sessionsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Booked Sessions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentSessions.map((session) => (
          <div
            key={session._id}
            className="bg-white shadow-md rounded-lg p-5 border flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{session.title}</h3>

              <p className="text-sm text-gray-600 mb-1">
                Tutor:{" "}
                <span className="font-medium text-gray-800">
                  {session.tutorName || "Unknown"}
                </span>
              </p>

              <p className="text-sm text-gray-600 mb-1">
                Registration Fee:{" "}
                <span className="text-green-600 font-semibold">
                  ${session.registrationFee || "0.00"}
                </span>
              </p>

              <p className="text-sm text-gray-600 mb-1">
                Status:{" "}
                <span className="font-medium text-blue-600">
                  {session.status || "Booked"}
                </span>
              </p>
            </div>

            <div className="mt-4 text-right">
              <Link
                to={`/dashboard/booked-session/${session.sessionId}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBookedSessions;
