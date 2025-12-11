import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams, Link } from "react-router-dom";
import type { Project, Task } from "../types";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");

  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        console.log(res.data);
        setProject(res.data);
      } catch (error) {
        console.log(error);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    const fetchProjectTasks = async () => {
      try {
        const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
        console.log(res.data);
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjectTasks();
  }, [projectId]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(`/api/projects/${projectId}/tasks`, {
        title,
        description,
        status,
      });
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
      setDescription("");
      setStatus("todo");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-2xl text-sky-400 animate-pulse">
          Loading project...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-2xl text-red-400 mb-4">Error loading project</div>
        <Link to="/projects" className="text-sky-400 hover:text-sky-300">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="text-white mt-8">
      <Link
        to="/projects"
        className="text-sky-400 hover:text-sky-300 mb-4 inline-block"
      >
        ← Back to Projects
      </Link>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-sky-400 mb-2">
          {project?.name}
        </h1>
        <p className="text-xl text-gray-400">{project?.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-sky-400">
              Add New Task
            </h2>
            <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="Task title"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  placeholder="Task description"
                  rows={3}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Status</label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "todo" | "in-progress" | "done")
                  }
                  className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">
            Tasks ({tasks.length})
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-zinc-800 p-8 rounded-xl text-center">
              <p className="text-gray-400">
                No tasks yet. Create your first task!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-zinc-800 border border-zinc-700 hover:border-sky-500 rounded-xl p-5 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        task.status === "done"
                          ? "bg-green-500/20 text-green-400"
                          : task.status === "in-progress"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {task.status === "todo"
                        ? "To Do"
                        : task.status === "in-progress"
                        ? "In Progress"
                        : "Done"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{task.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
