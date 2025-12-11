import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "../types";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/api/projects");
        console.log(res.data);
        setProjects(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-2xl text-sky-400 animate-pulse">
          Loading projects...
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await apiClient.post("/api/projects", { name, description });
      setProjects((prev) => [...prev, res.data]);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setName("");
      setDescription("");
    }
  };

  return (
    <div className="text-white mt-8">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-sky-400">
          Create New Project
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="project-name" className="text-sm text-gray-400">
              Project Name
            </label>
            <input
              type="text"
              name="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="project-description"
              className="text-sm text-gray-400"
            >
              Description
            </label>
            <textarea
              name="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors resize-none"
              placeholder="Enter project description"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Create Project
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-md mt-4">
          {error}
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-10 mb-4">Your Projects</h2>

      {projects.length === 0 ? (
        <p className="text-gray-400">
          No projects yet. Create your first one above!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-zinc-800 border border-zinc-700 hover:border-sky-500 rounded-xl p-5 flex flex-col transition-colors"
            >
              <h3 className="text-xl font-bold text-sky-400 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-400 flex-grow mb-4">
                {project.description}
              </p>
              <Link
                to={`/projects/${project._id}`}
                className="bg-sky-500 hover:bg-sky-600 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View Project →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
