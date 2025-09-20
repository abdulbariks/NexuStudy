import React from "react";
import useTitle from "../../hooks/useTitle";

const tutors = [
  {
    name: "Abdul Barik",
    image: "https://i.ibb.co/bpYbW45/Abdul-Barik.jpg",
  },
  {
    name: "Sarah Khan",
    image: "https://i.ibb.co/0j3pL98C/images-7.jpg",
  },
  {
    name: "David Lee",
    image: "https://i.ibb.co/S4RWRr36/07-CK3-Zr-Eu-H.png",
  },
  {
    name: "Ayesha Noor",
    image: "https://i.ibb.co/9mFdyG7G/doctor-sample.png",
  },
];

const AboutUs = () => {
  useTitle("AboutUs | NexuStudy ");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-12 w-11/12 mx-auto pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Left Side */}
      <div className="text-gray-800 dark:text-gray-200 space-y-5">
        <h2 className="text-3xl font-bold text-indigo-500 dark:text-indigo-400">
          About Us
        </h2>
        <p className="text-justify leading-relaxed">
          This Collaborative Study Platform connects students, tutors, and
          administrators to streamline study sessions, resource sharing, and
          user management. Our goal is to enhance educational collaboration,
          improve access to learning materials, and support dynamic academic
          needs with a user-friendly and secure system.
        </p>
        <p className="text-justify">
          The platform implements role-based access for students, tutors, and
          admins. Students can book sessions, take notes, and review materials.
          Tutors create sessions and upload resources. Admins manage users,
          content, and session approval workflows.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold mb-5 text-indigo-500 dark:text-indigo-400">
          Your Best Tutors
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {tutors.map((tutor, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700 flex flex-col items-center transition-colors duration-300"
            >
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-40 h-40 object-fill rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {tutor.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
