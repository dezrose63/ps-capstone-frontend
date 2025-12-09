import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="mx-auto max-w-3xl text-white p-6 flex justify-between">
         
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
        </nav>
    );
}
export default Navbar;
