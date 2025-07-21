import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewAllStudyMaterial = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: studyMaterials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["study-material", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/booked-session", {
        params: { studentEmail: user?.email },
      });
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading materials...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load materials.
      </p>
    );
  if (studyMaterials.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        No study materials found.
      </p>
    );

  const totalPages = Math.ceil(studyMaterials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = studyMaterials.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Study Materials
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 border-b">#</th>
              <th className="px-4 py-3 border-b">Title</th>
              <th className="px-4 py-3 border-b">Tutor</th>
              <th className="px-4 py-3 border-b">Fee</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((material, index) => (
              <tr key={material._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b text-sm">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-3 border-b text-sm">{material.title}</td>
                <td className="px-4 py-3 border-b text-sm">
                  {material.tutorName || "N/A"}
                </td>
                <td className="px-4 py-3 border-b text-sm text-green-600 font-medium">
                  ${material.registrationFee || "0.00"}
                </td>
                <td className="px-4 py-3 border-b text-sm text-blue-600 font-medium">
                  {material.status || "Booked"}
                </td>
                <td className="px-4 py-3 border-b text-center">
                  <Link
                    to={`/dashboard/booked-session/${material.sessionId}`}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    View All Material
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
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

export default ViewAllStudyMaterial;
