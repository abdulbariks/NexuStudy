import { use } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FcSettings } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import MenuItem from "./Menu/MenuItem";
import { AuthContext } from "../../contexts/AuthContext";
import AdminMenu from "./Menu/AdminMenu";
import TutorMenu from "./Menu/TutorMenu";
import StudentMenu from "./Menu/StudentMenu";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";
import Loading from "../Loading";
const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const { logOut } = use(AuthContext);
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading />;
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch(() => {
        // console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogOut Fail!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <aside
      className={`fixed top-13 left-0 z-40 bg-[#F4EDEA] w-64 p-4 h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300 ease-in-out 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0`}
    >
      <nav className="space-y-2">
        <h2 className="text-center text-3xl font-bold">Dashboard</h2>
        {role === "student" && <StudentMenu />}
        {role === "tutor" && <TutorMenu />}
        {role === "admin" && <AdminMenu />}

        <hr className="my-4 border-gray-600" />

        <MenuItem
          label="Profile"
          address="/dashboard/profile"
          icon={<FcSettings className="w-5 h-5" />}
        />

        <div className="flex w-full items-center px-4 py-2 mt-4 hover:bg-gray-300 hover:text-gray-700">
          <GrLogout className="w-5 h-5" />
          <button className="ml-3" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
