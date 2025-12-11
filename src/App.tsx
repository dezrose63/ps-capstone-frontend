import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import Navbar from "./components/Navbar";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AuthPage from "./pages/AuthPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

// Wrapper component for protecting routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authCtx = useContext(AuthContext);
  
  // If there is no context navigate user to /auth
  if (!authCtx) return <Navigate to="/auth" replace />;

  // Loading effect for auth
  if (authCtx.loading) return null;

  // If not authenticated redirect
  if (!authCtx.user || !authCtx.token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <>
      <div className="p-5 bg-zinc-900 h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
