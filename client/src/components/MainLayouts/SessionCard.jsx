import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router";

const SessionCard = ({ session }) => {
  const isClosed = dayjs().isAfter(dayjs(session.registrationEnd));
  console.log(session);

  return (
    <div className="border rounded-lg shadow hover:shadow-md p-5 bg-white transition">
      <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
      <p className="text-gray-600 mb-4">
        {session.description.length > 100
          ? session.description.slice(0, 100) + "..."
          : session.description}
      </p>

      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            isClosed ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {isClosed ? "Closed" : "Ongoing"}
        </span>
        <button className="text-blue-600 bg-green-100 rounded-full px-3 py-1  text-sm font-medium">
          {session?.registrationFee === 0
            ? "free"
            : `Fee: ${session?.registrationFee} /=`}
        </button>
        <Link to={`/session-details/${session._id}`}>
          <button className="bg-green-100 text-green-700 rounded-full py-1 px-3 cursor-pointer">
            read more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
