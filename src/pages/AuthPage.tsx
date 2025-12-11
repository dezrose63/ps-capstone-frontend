import { useContext, useState, type FormEvent } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [showRegister, setShowRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { logIn, register } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (!email || !password) return;
      await logIn(email, password);
      navigate("/projects");
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (!username || !email || !password) return;
      await register(username, email, password);
      setShowRegister(false);
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-2 text-center">
        {showRegister ? "Create an Account" : "Welcome Back"}
      </h1>
      <p className="text-gray-400 mb-8">
        {showRegister
          ? "Start managing your projects today"
          : "Sign in to continue"}
      </p>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      {showRegister ? (
        <form
          onSubmit={handleRegister}
          className="bg-zinc-800 p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-5"
        >
          <h2 className="text-2xl font-bold text-center text-sky-400">
            Register
          </h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm text-gray-400">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-2 cursor-pointer"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className="bg-zinc-800 p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-5"
        >
          <h2 className="text-2xl font-bold text-center text-sky-400">
            Sign In
          </h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-2 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      )}

      <div className="mt-6 text-gray-400">
        {showRegister ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-sky-400 hover:text-sky-300 cursor-pointer font-medium"
              onClick={() => setShowRegister(false)}
            >
              Sign in
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span
              className="text-sky-400 hover:text-sky-300 cursor-pointer font-medium"
              onClick={() => setShowRegister(true)}
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
