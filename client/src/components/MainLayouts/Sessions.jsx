import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SessionCard from "./SessionCard";
import Loading from "../Loading";
import { Link } from "react-router";

const Sessions = () => {
  const axiosSecure = useAxiosSecure();
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/sessions");
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <h3 className="text-4xl font-bold text-indigo-500 dark:text-indigo-400">
        Sessions
      </h3>
      <p className="py-5 text-gray-700 dark:text-gray-300">
        Explore your knowledge with our Sessions
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16">
        {sessions.slice(0, 6).map((session, index) => (
          <SessionCard key={session._id || index} session={session} />
        ))}
      </div>

      <Link to={"study-session"}>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-800 py-3 px-5 my-10 cursor-pointer rounded-md transition-colors duration-300">
          More Sessions
        </button>
      </Link>
    </div>
  );
};

export default Sessions;
