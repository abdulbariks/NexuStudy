import React from "react";
import useTitle from "../../hooks/useTitle";

const Contact = () => {
  useTitle("Contact | NexuStudy ");
  return (
    <div className="px-6 py-12 w-11/12 mx-auto">
      <h2 className="text-4xl font-bold text-center text-indigo-500 mb-10">
        Contact Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902423598345!2d90.39068167501218!3d23.750885889137287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a35a7e1f3b%3A0x8f59352a5a0b6eeb!2sDhaka%20University!5e0!3m2!1sen!2sbd!4v1691754873555!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            className="w-full h-full min-h-[400px]"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="h-full bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col justify-between">
          <div className="space-y-1 text-gray-700 text-sm mb-6">
            <p>
              <strong>Email:</strong> info@nexustudy.com
            </p>
            <p>
              <strong>Phone:</strong> +880 1575092830
            </p>
            <p>
              <strong>Location:</strong> Dhaka, Bangladesh
            </p>
          </div>
          <form className="space-y-4 flex-grow">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Your Message
              </label>
              <textarea
                placeholder="Write your message..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
