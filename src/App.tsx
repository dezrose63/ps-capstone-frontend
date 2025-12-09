import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import ProjectsPage from './pages/ProjectsPage.tsx';
import Navbar from './components/Navbar.tsx';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

function App() {
	return (
		<>
		  <div className="bg-zinc-900 h-screen">
		  <Navbar />
			<Routes>
				<Route path="/" element={<HomePage />}/>
				<Route path="/projects" element={<ProjectsPage />}/>
				<Route path="/projects/:projectId" element={<ProjectDetailsPage />}/>
			</Routes>
		  </div>
		</>
	);
}

export default App;
