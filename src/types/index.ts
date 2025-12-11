export interface Project {
  name: string;
  description: string;
  _id: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  project: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  githubId?: string;
}
