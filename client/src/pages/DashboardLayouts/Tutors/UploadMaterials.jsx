import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import dayjs from "dayjs";
import UploadMaterialModal from "../../../components/Modal/UploadMaterialModal";

const UploadMaterials = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSession(null);
    setIsModalOpen(false);
  };

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["tutor-sessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor-sessions?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(sessions);

  return (
    <div className="max-w-6xl mx-auto p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Upload Materials Your Sessions
      </h2>

      {isLoading ? (
        <p>Loading Sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-gray-500">No sessions found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="py-3 px-4 border">Title</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id} className="text-sm border-t">
                <td className="py-3 px-4 border">{session.title}</td>
                <td className="py-3 px-4 border whitespace-pre-wrap">
                  {session.description}
                </td>
                <td className="py-3 px-4 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      dayjs().isAfter(dayjs(session.registrationEnd))
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {dayjs().isAfter(dayjs(session.registrationEnd))
                      ? "Closed"
                      : "Ongoing"}
                  </span>
                </td>
                <td className="py-3 px-4 border space-x-2">
                  <button
                    onClick={() => openModal(session)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                  >
                    Upload Materials
                  </button>
                  <UploadMaterialModal
                    sessionId={session._id}
                    tutorEmail={session.tutorEmail}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    session={selectedSession}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadMaterials;
