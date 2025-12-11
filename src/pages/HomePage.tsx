import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function HomePage() {
  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;

  return (
    <div className="text-white flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Welcome to <span className="text-sky-400">ProjectHub</span>
      </h1>
      <p className="text-xl text-gray-400 mb-8 text-center max-w-lg">
        Organize your projects and tasks in one place. Stay productive and never
        miss a deadline.
      </p>

      <div className="flex gap-4">
        {user ? (
          <Link
            to="/projects"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            View My Projects
          </Link>
        ) : (
          <>
            <Link
              to="/auth"
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/auth"
              className="border border-sky-500 text-sky-400 hover:bg-sky-500/10 font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Sign In
            </Link>
          </>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-zinc-800 p-6 rounded-xl text-center">
          <div className="text-3xl mb-3">📁</div>
          <h3 className="text-lg font-semibold mb-2">Create Projects</h3>
          <p className="text-gray-400 text-sm">
            Organize your work into projects with descriptions
          </p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl text-center">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="text-lg font-semibold mb-2">Manage Tasks</h3>
          <p className="text-gray-400 text-sm">
            Add tasks and track their progress
          </p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-xl text-center">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
          <p className="text-gray-400 text-sm">
            Your data is protected with JWT authentication
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
