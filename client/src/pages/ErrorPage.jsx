import React from "react";
import { useRouteError, Link } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 text-center">
      <div className="max-w-lg bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-6xl font-bold text-blue-700 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {error.status || 404} - Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          {error.statusText ||
            "The page you’re looking for doesn’t exist or an unexpected error occurred."}
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
