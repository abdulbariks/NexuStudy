import React, { use } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = use(AuthContext);

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
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Log Out Failed!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#F4EDEA] dark:bg-gray-900 shadow-sm z-50 transition-colors duration-300">
      <div className="navbar w-11/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 dark:text-gray-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {["Home", "Study Session", "Blogs", "About Us", "Contact"].map(
                (item, i) => {
                  const link =
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`;
                  return (
                    <li key={i}>
                      <NavLink
                        to={link}
                        className={({ isActive }) =>
                          isActive
                            ? "text-indigo-500 font-semibold"
                            : "text-black dark:text-gray-200"
                        }
                      >
                        {item}
                      </NavLink>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
            <FaGraduationCap className="text-2xl text-indigo-600 dark:text-indigo-400" />
            <span>Nexu</span>
            <FiShare2 className="rotate-45 text-indigo-500 dark:text-indigo-400" />
            <span>Study</span>
          </div>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">
            {["Home", "Study Session", "Blogs", "About Us", "Contact"].map(
              (item, i) => {
                const link =
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`;
                return (
                  <li key={i}>
                    <NavLink
                      to={link}
                      className={({ isActive }) =>
                        isActive
                          ? "text-indigo-500 font-semibold"
                          : "text-black dark:text-gray-200"
                      }
                    >
                      {item}
                    </NavLink>
                  </li>
                );
              }
            )}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-5">
          {!user ? (
            <div className="flex gap-5">
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-500 font-semibold"
                    : "text-black dark:text-gray-200"
                }
              >
                Login
              </NavLink>
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-500 font-semibold"
                    : "text-black dark:text-gray-200"
                }
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt={user?.displayName} src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-[#F4EDEA] dark:bg-gray-800 dark:text-gray-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink
                    to={"/dashboard"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-500 font-semibold"
                        : "text-black dark:text-gray-200"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="text-indigo-500 font-semibold">
                  <button onClick={handleLogOut}> Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
