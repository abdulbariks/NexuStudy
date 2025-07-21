import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateNote = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Mutation: create note with axiosSecure
  const { mutate, isLoading } = useMutation({
    mutationFn: async (noteData) => {
      const res = await axiosSecure.post("/create-note", noteData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Note Created!",
        text: "Your note was successfully saved.",
        timer: 2000,
        toast: true,
        showConfirmButton: false,
        position: "top-end",
      });
      queryClient.invalidateQueries(["notes"]);
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong while creating the note.",
        toast: true,
        position: "top-end",
      });
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, email: user?.email });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create a Note</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border rounded"
            placeholder="Note title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-3 py-2 border rounded"
            placeholder="Write your note..."
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Saving..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
