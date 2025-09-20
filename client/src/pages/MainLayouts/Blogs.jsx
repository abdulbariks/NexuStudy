import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";

const Blogs = () => {
  useTitle("Blogs | NexuStudy ");
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/create-blog");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-800 dark:text-gray-200">
        Loading...
      </p>
    );
  if (isError) {
    Swal.fire("Error", "Failed to fetch blogs", "error");
    return null;
  }

  // Pagination Logic
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const selectedBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-20 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500 dark:text-indigo-400">
        All Blogs
      </h2>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg overflow-hidden transition-colors duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                By {blog.author} on{" "}
                {new Date(blog.createdDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-200 text-sm">
                {blog.description.slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded transition-colors duration-300 ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-indigo-700 text-gray-200 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
