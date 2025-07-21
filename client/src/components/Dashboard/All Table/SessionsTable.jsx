import React, { useState } from "react";
import UpdateSessionFeeStatusModal from "../../Modal/UpdateSessionFeeStatusModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SessionsTable = ({ session }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  console.log(session);

  let [isOpen, setIsOpen] = useState(false);

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
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{session?.title}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          $ {session?.registrationFee} /=
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`${
            session?.status === "pending"
              ? "text-yellow-500"
              : session?.status === "approved"
              ? "text-green-500"
              : "text-red-500"
          } whitespace-no-wrap`}
        >
          {session?.status ? session?.status : "Unavailable"}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Fee & Status</span>
        </span>
        {/* Modal */}
        <UpdateSessionFeeStatusModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          session={session}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDelete(session._id)}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SessionsTable;
