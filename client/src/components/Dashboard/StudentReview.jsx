import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { use, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthContext";

const StudentReview = ({ id }) => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(5);
  const queryClient = useQueryClient();

  // Post review
  const reviewMutation = useMutation({
    mutationFn: async (newReview) => {
      console.log(newReview);

      const res = await axiosSecure.post("/reviews", newReview);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      Swal.fire({ icon: "success", title: "Review added!" });
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "You have already reviewed this session.",
        });
      } else {
        Swal.fire({ icon: "error", title: "Failed to submit review" });
      }
    },
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    reviewMutation.mutate({
      sessionId: id,
      userEmail: user?.email,
      rating,
    });
  };
  return (
    <div>
      <div>
        {/* Reviews */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Student Reviews
          </h3>
        </div>
        {/* Add Review */}

        <form onSubmit={handleReviewSubmit} className="mt-4 space-y-3">
          <div className="flex items-center gap-4">
            <label className="text-sm">Rating:</label>
            <select
              className="border p-1 text-sm"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentReview;
