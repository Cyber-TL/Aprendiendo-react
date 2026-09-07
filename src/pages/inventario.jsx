import Producto from "../components/Producto";
import FormularioProducto from "../components/FormularioProducto";

function Inventario({
  productos,
  categorias,
  categoriaActiva,
  setCategoriaActiva,
  mensaje,
  busqueda,
  setBusqueda,
  filtroEstado,
  setFiltroEstado,
  orden,
  setOrden,
  limpiarFiltros,
  productoEditando,
  onAgregar,
  onActualizar,
  onEliminar,
  onModificarStock,
  onEditar,
  totalProductos,
  productosAgotados,
  valorInventario,
  productoMasCostoso,
}) {
  return (
    <main className="app">
      <div className="titulo-wrapper">
        <h1>Catálogo Sena</h1>
      </div>

      {mensaje && <div className="mensaje-estado">{mensaje}</div>}

      <FormularioProducto
        onAgregar={onAgregar}
        onActualizar={onActualizar}
        productoEditando={productoEditando}
      />

      <div className="tablero">
        <p>Productos registrados: {totalProductos}</p>
        <p>Productos agotados: {productosAgotados}</p>
        <p>Valor total del inventario: ${valorInventario}</p>
        <p>Producto más costoso: {productoMasCostoso ? productoMasCostoso.nombre : "N/A"}</p>
      </div>

      <div className="controles-consulta">
        <input
          type="text"
          className="busqueda"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Disponibles">Disponibles</option>
          <option value="Agotados">Agotados</option>
        </select>

        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
          <option value="">Ordenar por...</option>
          <option value="nombre-asc">Nombre A-Z</option>
          <option value="precio-asc">Precio menor a mayor</option>
          <option value="precio-desc">Precio mayor a menor</option>
          <option value="stock-asc">Stock menor a mayor</option>
          <option value="stock-desc">Stock mayor a menor</option>
        </select>

        <button className="filtro-btn" onClick={limpiarFiltros}>
          Limpiar filtros
        </button>
      </div>

      <div className="filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`filtro-btn ${categoriaActiva === cat ? "activo" : ""}`}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {productos.length === 0 ? (
        <p className="sin-resultados">No se encontraron productos.</p>
      ) : (
        <section className="catalogo">
          {productos.map((producto) => (
            <Producto
              key={producto.id}
              producto={producto}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              categoria={producto.categoria}
              imagen={producto.imagen}
              onEliminar={onEliminar}
              onModificarStock={onModificarStock}
              onEditar={onEditar}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Inventario;