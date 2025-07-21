import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateNoteModal = ({ isOpen, onClose, note }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Populate form when modal opens
  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        description: note.description,
      });
    }
  }, [note, reset]);

  // Mutation for updating note
  const { mutate, isLoading } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/notes/${note._id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Note updated!",
        toast: true,
        timer: 2000,
        position: "top-end",
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["personal-notes"]);
      onClose();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Update failed!",
        toast: true,
        position: "top-end",
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Update Note</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-3 py-2 border rounded"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {isLoading ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNoteModal;
