import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
  const authCtx = useContext(AuthContext)!;
  const { user, logOut } = authCtx;

  return (
    <nav className="text-white flex justify-between items-center w-full h-14 bg-zinc-800 px-6 rounded-lg shadow-lg">
      <div className="flex gap-6 items-center">
        <NavLink
          to="/"
          className="text-xl font-bold text-sky-400 hover:text-sky-300 transition-colors"
        >
          ProjectHub
        </NavLink>
        {user && (
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-sky-500 text-white"
                  : "hover:bg-zinc-700 text-gray-300"
              }`
            }
          >
            Projects
          </NavLink>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="bg-zinc-700 px-4 py-2 rounded-full text-sm">
            👋 Hello,{" "}
            <span className="font-semibold text-sky-400">{user.username}</span>
          </div>
        )}
        {!user ? (
          <NavLink
            to="/auth"
            className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Sign In
          </NavLink>
        ) : (
          <button
            onClick={() => logOut()}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
