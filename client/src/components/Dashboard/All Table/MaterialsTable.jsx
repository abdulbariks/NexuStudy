import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MaterialsTable = ({ material }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  console.log(material);

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/admin-materials/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tutor-sessions"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Material has been deleted.",
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
        <p className="text-gray-900 whitespace-no-wrap">{material?.title}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {material?.tutorEmail}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDelete(material._id)}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MaterialsTable;
