import React, { useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const UpdateSessionModal = ({ isOpen, onClose, session }) => {
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
    if (session) {
      reset({
        title: session.title,
        description: session.description,
        registrationStart: session.registrationStart,
        registrationEnd: session.registrationEnd,
        classStart: session.classStart,
        classEnd: session.classEnd,
        duration: session.duration,
      });
    }
  }, [session, reset]);

  // Mutation for updating note
  const { mutate, isLoading } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(
        `/tutor-session/${session._id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Session updated!",
        toast: true,
        timer: 2000,
        position: "top-end",
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["tutor-sessions"]);
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Registration Start Date
              </label>
              <input
                type="date"
                {...register("registrationStart")}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Registration End Date
              </label>
              <input
                type="date"
                {...register("registrationEnd")}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Class Start Date</label>
              <input
                type="date"
                {...register("classStart")}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Class End Date</label>
              <input
                type="date"
                {...register("classEnd")}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Session Duration</label>
            <input
              type="text"
              placeholder="e.g., 8 weeks"
              {...register("duration")}
              className="border p-2 w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {isLoading ? "Updating..." : "Update Session"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSessionModal;
