import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Assume user is passed as a prop or from context
const CreateStudySession = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      tutorName: user?.displayName || "",
      tutorEmail: user?.email || "",
      registrationFee: 0,
      status: "pending",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/sessions", data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Note Created!",
        text: "Your session was successfully saved.",
        timer: 2000,
        toast: true,
        showConfirmButton: false,
        position: "top-end",
      });
      reset({
        tutorName: user?.displayName || "",
        tutorEmail: user?.email || "",
        registrationFee: 0,
        status: "pending",
      });
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
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto p-4 border rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Create New Study Session</h2>

      <div>
        <label className="block font-medium mb-1">Session Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Tutor Name</label>
        <input
          type="text"
          readOnly
          {...register("tutorName")}
          className="border p-2 w-full bg-gray-100"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Tutor Email</label>
        <input
          type="email"
          readOnly
          {...register("tutorEmail")}
          className="border p-2 w-full bg-gray-100"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Session Description</label>
        <textarea {...register("description")} className="border p-2 w-full" />
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
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {isPending ? "Submitting..." : "Create Session"}
      </button>
    </form>
  );
};

export default CreateStudySession;
