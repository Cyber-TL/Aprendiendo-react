import { useParams, useNavigate } from "react-router";

function DetalleProducto({ productos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // useParams() devuelve el id como texto, por eso comparamos con String()
  const producto = productos.find((item) => String(item.id) === id);

  if (!producto) {
    return (
      <main className="app">
        <p className="sin-resultados">Producto no encontrado</p>
        <button className="filtro-btn" onClick={() => navigate("/inventario")}>
          Volver al inventario
        </button>
      </main>
    );
  }

  return (
    <main className="app">
      <div className="titulo-wrapper">
        <h1>{producto.nombre}</h1>
      </div>
      <article className="producto" style={{ maxWidth: 320, margin: "0 auto" }}>
        <img src={producto.imagen} alt={producto.nombre} />
        <span className="categoria">{producto.categoria}</span>
        <p>{producto.descripcion}</p>
        <strong>${producto.precio}</strong>
        <p>Stock: {producto.stock}</p>
      </article>
      <button className="filtro-btn" onClick={() => navigate("/inventario")}>
        Volver al inventario
      </button>
    </main>
  );
}

export default DetalleProducto;