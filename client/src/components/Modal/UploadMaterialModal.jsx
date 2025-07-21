import React from "react";
import { useForm } from "react-hook-form"; // your secured axios instance
import Swal from "sweetalert2";
import { imageUpload } from "../../hooks/imageUpload";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UploadMaterialModal = ({ isOpen, onClose, sessionId, tutorEmail }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageUrl = await imageUpload(imageFile); // your custom imageUpload function

      const material = {
        title: data.title,
        sessionId,
        tutorEmail,
        image: imageUrl,
        link: data.link,
        uploadedAt: new Date(),
      };

      await axiosSecure.post("/upload-material", material);

      Swal.fire({
        icon: "success",
        title: "Material uploaded successfully!",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Upload failed", error);
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: "Please try again later",
        position: "top-end",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Study Material</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              className="w-full mt-1 border rounded p-2"
              placeholder="Material title"
            />
          </div>

          <div>
            <label className="block font-medium">Study Session ID</label>
            <input
              type="text"
              value={sessionId}
              readOnly
              className="w-full mt-1 border rounded p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Tutor Email</label>
            <input
              type="email"
              value={tutorEmail}
              readOnly
              className="w-full mt-1 border rounded p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Image Upload</label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="w-full mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Google Drive Link</label>
            <input
              {...register("link", { required: true })}
              type="url"
              placeholder="https://drive.google.com/..."
              className="w-full mt-1 border rounded p-2"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterialModal;
