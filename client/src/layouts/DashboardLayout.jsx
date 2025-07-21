import { Link, Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-[#F4EDEA] px-4 py-3 fixed top-0 left-0 w-full z-50 shadow ">
        <div className="w-11/12 mx-auto flex items-end justify-end">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="text-2xl text-black md:hidden"
            >
              {sidebarOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
            <Link to={"/"}>
              <div className="flex items-center gap-2 text-xl font-bold text-indigo-600">
                <FaGraduationCap className="text-2xl text-indigo-600" />
                <span>Nexu</span>
                <FiShare2 className="rotate-45 text-indigo-500" />
                <span>Study</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex flex-1 pt-16 h-full">
        <Sidebar sidebarOpen={sidebarOpen} />
        <main className="flex-1 ml-0 md:ml-64 overflow-y-auto p-4 h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
