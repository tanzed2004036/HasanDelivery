import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import UseAuth from "../../../hooks/UseAuth";

const Navbar = () => {
  const { user, Logout } = UseAuth();

  const handleLogout = () => {
    Logout();
  };

  const manueItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-bold"
              : "text-black hover:text-red-400 transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-bold"
              : "text-black hover:text-red-400 transition"
          }
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-bold"
              : "text-black hover:text-red-400 transition"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/send-parcel"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-bold"
              : "text-black hover:text-red-400 transition"
          }
        >
          Send Parcel
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-bold"
              : "text-black hover:text-red-400 transition"
          }
        >
          Coverage
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-bold"
                : "text-black hover:text-red-400 transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {manueItems}
              <li className="lg:hidden">
                <Link to="/rider">Be a Rider</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <Logo></Logo>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{manueItems}</ul>
        </div>
        <div className="navbar-end gap-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-xs sm:btn-sm btn-soft"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/auth/login" className="btn btn-xs sm:btn-sm btn-soft">
              Login
            </Link>
          )}
          <Link
            to="/rider"
            className="hidden lg:inline-flex btn btn-sm btn-error"
          >
            Be a Rider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
