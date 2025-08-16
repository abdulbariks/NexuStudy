import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router";

const SessionCard = ({ session }) => {
  const isClosed = dayjs().isAfter(dayjs(session.registrationEnd));
  console.log(session);

  return (
    <div className="border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {session.title.length > 30
          ? session.title.slice(0, 30) + "..."
          : session.title}
      </h2>
      <p className="text-gray-600 mb-4">
        {session.description.length > 100
          ? session.description.slice(0, 100) + "..."
          : session.description}
      </p>

      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            isClosed
              ? "bg-red-50 text-red-600 border border-red-100"
              : "bg-green-50 text-green-600 border border-green-100"
          }`}
        >
          {isClosed ? "Closed" : "Ongoing"}
        </span>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
          {session?.registrationFee === 0
            ? "Free"
            : `Fee: ${session?.registrationFee} ৳`}
        </span>
        <Link to={`/session-details/${session._id}`}>
          <button className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition">
            Read More →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
