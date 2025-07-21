import React, { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateNoteModal from "../../../components/Modal/UpdateNoteModal";

const ManagePersonalNotes = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setIsModalOpen(false);
  };

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["personal-notes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes?email=${user?.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/notes/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["personal-notes"]);
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
      <h2 className="text-2xl font-semibold mb-6">Manage Your Notes</h2>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">No personal notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded shadow p-4 border border-gray-200"
            >
              <h3 className="text-lg font-bold mb-2">{note.title}</h3>
              <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                {note.description}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openModal(note)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <UpdateNoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        note={selectedNote}
      />
    </div>
  );
};

export default ManagePersonalNotes;
