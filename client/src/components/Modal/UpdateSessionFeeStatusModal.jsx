import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateSessionFeeStatusModal = ({ isOpen, setIsOpen, session }) => {
  const { _id, status, registrationFee } = session;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const [sessionFee, setSessionFee] = useState(registrationFee || "");

  function close() {
    setIsOpen(false);
  }

  const mutation = useMutation({
    mutationFn: async ({ status, sessionFee }) => {
      const { data } = await axiosSecure.patch(`/admin-session/${_id}`, {
        status,
        registrationFee: sessionFee,
      });
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Session Status and Fee Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsOpen(false);
      queryClient.invalidateQueries(["sessions"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ status: updatedStatus, sessionFee });
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
              Update Session Status & Fee
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="number"
                  min="0"
                  value={sessionFee}
                  onChange={(e) => setSessionFee(e.target.value)}
                  placeholder="Enter session fee"
                  className="w-full my-3 border border-gray-200 rounded-xl px-2 py-3"
                  required
                />
              </div>
              <div>
                <select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  className="w-full my-3 border border-gray-200 rounded-xl px-2 py-3"
                  name="status"
                >
                  <option value="pending">pending</option>
                  <option value="approved">approved</option>
                </select>
              </div>
              <div className="flex justify-between mt-5">
                <button
                  type="submit"
                  className="bg-green-400 py-2 px-3 cursor-pointer text-gray-700 rounded-xl"
                >
                  Update
                </button>
                <button
                  onClick={close}
                  type="button"
                  className="bg-red-400 py-2 px-3 cursor-pointer text-gray-700 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateSessionFeeStatusModal;
