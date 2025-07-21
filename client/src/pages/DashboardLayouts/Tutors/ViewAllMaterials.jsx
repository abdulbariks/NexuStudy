import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewAllMaterials = ({ sessionId, tutorEmail }) => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: materials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["materials", sessionId, tutorEmail],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials", {
        params: { tutorEmail: user?.email },
      });
      return res.data || [];
    },
    enabled: !!user?.email,
  });
  console.log(materials);

  if (isLoading)
    return <p className="text-center mt-10">Loading materials...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load materials.
      </p>
    );
  if (materials.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">No materials found.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Uploaded Study Materials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {materials.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-3"
              />

              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>

              <p className="text-sm text-gray-500 mb-2">
                Uploaded:{" "}
                <span className="font-medium">
                  {new Date(item.uploadedAt).toLocaleDateString()}
                </span>
              </p>
            </div>

            <div className="mt-2">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700"
              >
                View Resource
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllMaterials;
