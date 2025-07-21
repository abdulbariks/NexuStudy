import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../hooks/imageUpload";

const CreateBlog = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (blogData) => {
      console.log(blogData);

      const res = await axiosSecure.post("/create-blog", blogData);
      console.log(res.data);

      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Blog Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["blogs"]);
      reset();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const onSubmit = async (data) => {
    const blogImage = data.image[0];

    // Upload to Cloudinary or Imgbb
    const imageUrl = await imageUpload(blogImage);

    const blogData = {
      title: data.title,
      description: data.description,
      author: data.author,
      createdDate: new Date().toISOString(),
      image: imageUrl, // now a string URL
    };

    mutate(blogData); // POST via axiosSecure
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold mb-4">Create a Blog</h2>

      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="w-full border rounded p-2"
          placeholder="Enter blog title"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full border rounded p-2"
          placeholder="Enter blog description"
        ></textarea>
      </div>

      <div>
        <label className="block mb-1 font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Author</label>
        <input
          type="text"
          {...register("author", { required: true })}
          className="w-full border rounded p-2"
          placeholder="Author name"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Create Blog"}
      </button>
    </form>
  );
};

export default CreateBlog;
