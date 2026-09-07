import { NavLink } from "react-router";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-marca">
        <span className="navbar-logo">💄</span>
        <span>Catálogo Sena</span>
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "activo" : ""}`}>Inicio</NavLink>
        <NavLink to="/inventario" className={({ isActive }) => `nav-link ${isActive ? "activo" : ""}`}>Inventario</NavLink>
        <NavLink to="/nuevo" className={({ isActive }) => `nav-link ${isActive ? "activo" : ""}`}>Nuevo producto</NavLink>
        <NavLink to="/acerca" className={({ isActive }) => `nav-link ${isActive ? "activo" : ""}`}>Acerca</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;