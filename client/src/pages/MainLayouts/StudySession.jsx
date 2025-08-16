import React from "react";
import SessionCard from "../../components/MainLayouts/SessionCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import useTitle from "../../hooks/useTitle";

const StudySession = () => {
  useTitle("StudySession | NexuStudy ");
  const axiosSecure = useAxiosSecure();
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/sessions");
      return data;
    },
  });

  console.log(sessions);

  if (isLoading) return <Loading />;
  return (
    <div className=" pt-20">
      <h2 className="text-4xl font-bold text-center text-indigo-500">
        All Study Sessions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16 py-5">
        {sessions.map((session, index) => (
          <SessionCard key={index} session={session} />
        ))}
      </div>
    </div>
  );
};

export default StudySession;
