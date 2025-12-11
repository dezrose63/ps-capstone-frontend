# Project Management Frontend

A React frontend for managing projects and tasks, built with Vite and TypeScript.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool (created with `npm create vite@latest`)
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Icon library

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API running (see Backend Setup)

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable           | Description            | Example                                                                     |
| ------------------ | ---------------------- | --------------------------------------------------------------------------- |
| `VITE_BACKEND_URL` | URL of the backend API | `http://localhost:4000` (dev) or `https://my-backend.onrender.com` (prod) |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment (Netlify)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add environment variable in Netlify dashboard:
   - Key: `VITE_BACKEND_URL`
   - Value: Your deployed backend URL (e.g., `https://my-backend.onrender.com`)
5. The `_redirects` file in `public/` ensures React Router works correctly on Netlify.

---

## API Routes & Frontend-Backend Connection

The frontend communicates with the backend REST API using Axios. Authentication is handled via JWT tokens stored in localStorage.

### Authentication Flow

1. User logs in via `/auth` page
2. Backend returns a JWT token
3. Token is stored in `localStorage`
4. All subsequent API requests include the token in the `Authorization` header via an Axios interceptor

### API Endpoints Used

#### Authentication (Public)

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| POST   | `/api/users/register` | Register a new user         |
| POST   | `/api/users/login`    | Login and receive JWT token |

#### Projects (Protected - requires auth)

| Method | Endpoint                   | Description                                      |
| ------ | -------------------------- | ------------------------------------------------ |
| GET    | `/api/projects`            | Get all projects for logged-in user              |
| GET    | `/api/projects/:projectId` | Get a single project (ownership check)           |
| POST   | `/api/projects`            | Create a new project                             |
| PUT    | `/api/projects/:projectId` | Update a project (ownership check)               |
| DELETE | `/api/projects/:projectId` | Delete a project and its tasks (ownership check) |

#### Tasks (Protected - requires auth)

| Method | Endpoint                         | Description                     |
| ------ | -------------------------------- | ------------------------------- |
| GET    | `/api/projects/:projectId/tasks` | Get all tasks for a project     |
| POST   | `/api/projects/:projectId/tasks` | Create a new task for a project |
| GET    | `/api/tasks/:taskId`             | Get a single task               |
| PUT    | `/api/tasks/:taskId`             | Update a task                   |
| DELETE | `/api/tasks/:taskId`             | Delete a task                   |

### Frontend Pages

| Route                  | Component            | Description                                        |
| ---------------------- | -------------------- | -------------------------------------------------- |
| `/`                    | `HomePage`           | Landing page                                       |
| `/auth`                | `AuthPage`           | Login/Register forms                               |
| `/projects`            | `ProjectsPage`       | View all projects, create new projects (protected) |
| `/projects/:projectId` | `ProjectDetailsPage` | View project details and tasks, create tasks       |

### Key Files

```
src/
├── clients/
│   └── api.ts              # Axios instance with auth interceptor
├── context/
│   └── AuthProvider.tsx    # Authentication context (user, token, login/logout)
├── pages/
│   ├── AuthPage.tsx        # Login/Register UI
│   ├── ProjectsPage.tsx    # Projects list and creation
│   └── ProjectDetailsPage.tsx  # Project details and tasks
├── types/
│   └── index.ts            # TypeScript interfaces (Project, Task, User)
└── App.tsx                 # Routes and ProtectedRoute wrapper
```

### How Authentication Works

```typescript
// src/clients/api.ts
// Axios interceptor adds token to every request
apiClient.interceptors.request.use((config) => {
  const value = localStorage.getItem("token");
  if (value) {
    const token = JSON.parse(value);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Backend Repository

The backend API is a separate Node.js/Express application. See the backend README for setup instructions.

**Backend Tech Stack:**

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
  import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
