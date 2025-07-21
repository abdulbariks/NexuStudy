import React, { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateSessionModal from "../../../components/Modal/UpdateSessionModal";
import dayjs from "dayjs";

const ManageSessions = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/tutor-session/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tutor-sessions"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Note has been deleted.",
        timer: 1500,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to delete",
        toast: true,
        position: "top-end",
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This note will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Your Sessions</h2>

      {isLoading ? (
        <p>Loading Sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-gray-500">No personal notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white rounded shadow p-4 border border-gray-200"
            >
              <h3 className="text-lg font-bold mb-2">{session.title}</h3>
              <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                {session.description}
              </p>
              <div className="flex justify-between gap-2">
                <button>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded ${
                      dayjs().isAfter(dayjs(session.registrationEnd))
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {dayjs().isAfter(dayjs(session.registrationEnd))
                      ? "Closed"
                      : "Ongoing"}
                  </span>
                </button>
                <button
                  onClick={() => openModal(session)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(session._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <UpdateSessionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        session={selectedSession}
      />
    </div>
  );
};

export default ManageSessions;
