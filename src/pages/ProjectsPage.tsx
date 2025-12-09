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
      
      } catch (error: unknown) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await apiClient.post("/api/projects", { name, description });
      setProjects((prev) => [...prev, res.data]);
    
    } catch (error: unknown) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setName("")
      setDescription("")
    }
  };
  return (
    <div className="space-y-2">
      <h1 className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">Projects</h1>

      <form
        onSubmit={handleSubmit}
        className=" border p-2 h-50 mt-10 flex flex-col gap-2 rounded"
      >
        <label htmlFor="project-name">Project Name: </label>
        <input
          type="text"
          name="project-name"
          className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="project-description">Project Description</label>
        <input
          type="text"
          name="project-description"
          className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="submit"
          value="Create Project"
          className="mt-auto bg-sky-500 rounded"
        />
      </form>

      {error && <div>{error}</div>}

      <div className="p-4">
        {projects &&
          projects.map((project) => (
            <div
              key={project._id}
              className="text-white w-50 flex flex-col h-50 border border-red-500 p-2 text-center rounded"
            >
              <div className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800font-bold">{project.name}</div>
              <div>{project.description}</div>
              <Link
                to={`/projects/${project._id}`}
                className="mt-auto bg-sky-500 rounded"
              >
                See Project
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectsPage;