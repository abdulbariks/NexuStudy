import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-[#F4EDEA] p-10">
      <aside>
        <div className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <FaGraduationCap className="text-2xl text-indigo-600" />
          <span>Nexu</span>
          <FiShare2 className="rotate-45 text-indigo-500" />
          <span>Study</span>
        </div>
        <p className="text-indigo-500 font-bold">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <NavLink>
            <FaFacebook className="text-indigo-500" size={32} />
          </NavLink>
          <NavLink>
            <FaXTwitter className="text-indigo-500" size={32} />
          </NavLink>
          <NavLink>
            <FaLinkedin className="text-indigo-500" size={32} />
          </NavLink>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
