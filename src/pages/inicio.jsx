import { NavLink } from "react-router";

function Inicio({ totalProductos, unidadesDisponibles, productosStockBajo }) {
  return (
    <main className="app">
      <section className="hero">
        <p className="hero-etiqueta">TU ESPACIO DE TRABAJO</p>
        <h1 className="hero-titulo">
          Tu inventario, <br /> en orden.
        </h1>
        <p className="hero-texto">
          Consulta productos, actualiza existencias y encuentra cada detalle en un solo lugar.
        </p>
        <div className="hero-botones">
          <NavLink to="/inventario" className="btn-primario">
            Explorar inventario →
          </NavLink>
          <NavLink to="/nuevo" className="btn-secundario">
            + Nuevo producto
          </NavLink>
        </div>
      </section>

      <section className="hero-stats">
        <div className="stat-card">
          <span className="stat-numero">{totalProductos}</span>
          <span className="stat-label">Productos registrados</span>
        </div>
        <div className="stat-card">
          <span className="stat-numero">{unidadesDisponibles}</span>
          <span className="stat-label">Unidades disponibles</span>
        </div>
        <div className="stat-card">
          <span className="stat-numero">{productosStockBajo}</span>
          <span className="stat-label">Productos con stock bajo</span>
        </div>
      </section>
    </main>
  );
}

export default Inicio;