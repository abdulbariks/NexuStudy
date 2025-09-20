import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router";

const SessionCard = ({ session }) => {
  const isClosed = dayjs().isAfter(dayjs(session.registrationEnd));

  return (
    <div className="border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-800 p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {session.title.length > 30
          ? session.title.slice(0, 30) + "..."
          : session.title}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {session.description.length > 100
          ? session.description.slice(0, 100) + "..."
          : session.description}
      </p>

      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            isClosed
              ? "bg-red-50 text-red-600 border border-red-100 dark:bg-red-900 dark:text-red-200 dark:border-red-800"
              : "bg-green-50 text-green-600 border border-green-100 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
          }`}
        >
          {isClosed ? "Closed" : "Ongoing"}
        </span>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800">
          {session?.registrationFee === 0
            ? "Free"
            : `Fee: ${session?.registrationFee} ৳`}
        </span>

        <Link to={`/session-details/${session._id}`}>
          <button className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-800 dark:hover:bg-indigo-800 transition">
            Read More →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SessionCard;
