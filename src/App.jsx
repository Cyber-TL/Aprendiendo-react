import { useState, useEffect } from "react";
import Producto from "./components/Producto";
import FormularioProducto from "./components/FormularioProducto";
import "./App.css";

import labial from "./assets/labial.jpg";
import crema from "./assets/crema.jpg";
import perfume from "./assets/perfume.jpg";
import brochas from "./assets/brochas.jpg";
import sombra from "./assets/sombra.jpg";

const productosIniciales = [
  { id: 1, nombre: "Labial mate", descripcion: "Color rojo de larga duración", precio: 18000, categoria: "Maquillaje", imagen: labial, stock: 10 },
  { id: 2, nombre: "Crema facial", descripcion: "Hidratación profunda", precio: 26000, categoria: "Cuidado facial", imagen: crema, stock: 10 },
  { id: 3, nombre: "Perfume", descripcion: "Fragancia floral", precio: 42000, categoria: "Fragancias", imagen: perfume, stock: 10 },
  { id: 4, nombre: "Set de brochas", descripcion: "Kit de 5 brochas profesionales", precio: 35000, categoria: "Accesorios", imagen: brochas, stock: 10 },
  { id: 5, nombre: "Sombra de ojos", descripcion: "Paleta de tonos neutros", precio: 22000, categoria: "Maquillaje", imagen: sombra, stock: 10 },
];

function cargarProductosIniciales() {
  const guardados = localStorage.getItem("productos");
  return guardados ? JSON.parse(guardados) : productosIniciales;
}

function App() {
  const [productos, setProductos] = useState(cargarProductosIniciales);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [orden, setOrden] = useState("");

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
    setMensaje("Producto agregado correctamente.");
  };

  const actualizarProducto = (productoActualizado) => {
    setProductos(
      productos.map((producto) =>
        producto.id === productoActualizado.id ? productoActualizado : producto
      )
    );
    setProductoEditando(null);
    setMensaje("Producto actualizado correctamente.");
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
    setMensaje("Producto eliminado.");
  };

  const modificarStock = (id, cambio) => {
    setProductos(
      productos.map((producto) =>
        producto.id === id
          ? { ...producto, stock: Math.max(0, (producto.stock || 0) + cambio) }
          : producto
      )
    );
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);
  };

  const productosAgotados = productos.filter((p) => p.stock === 0).length;
  const valorInventario = productos.reduce(
    (total, producto) => total + producto.precio * (producto.stock || 0),
    0
  );

  // 1. Filtrar por categoría
  let productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  // 2. Filtrar por estado (disponible/agotado)
  if (filtroEstado === "Disponibles") {
    productosFiltrados = productosFiltrados.filter((p) => p.stock > 0);
  } else if (filtroEstado === "Agotados") {
    productosFiltrados = productosFiltrados.filter((p) => p.stock === 0);
  }

  // 3. Buscar por nombre
  if (busqueda.trim() !== "") {
    productosFiltrados = productosFiltrados.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  // 4. Ordenar (sin mutar el estado original)
  const productosOrdenados = [...productosFiltrados];
  if (orden === "nombre-asc") {
    productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (orden === "precio-asc") {
    productosOrdenados.sort((a, b) => a.precio - b.precio);
  } else if (orden === "precio-desc") {
    productosOrdenados.sort((a, b) => b.precio - a.precio);
  } else if (orden === "stock-asc") {
    productosOrdenados.sort((a, b) => a.stock - b.stock);
  } else if (orden === "stock-desc") {
    productosOrdenados.sort((a, b) => b.stock - a.stock);
  }

  return (
    <main className="app">
      <div className="titulo-wrapper">
        <h1>Catálogo Sena</h1>
      </div>

      {mensaje && <div className="mensaje-estado">{mensaje}</div>}

      <FormularioProducto
        onAgregar={agregarProducto}
        onActualizar={actualizarProducto}
        productoEditando={productoEditando}
      />

      <div className="tablero">
        <p>Productos registrados: {productos.length}</p>
        <p>Productos agotados: {productosAgotados}</p>
        <p>Valor total del inventario: ${valorInventario}</p>
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

      {productosOrdenados.length === 0 ? (
        <p className="sin-resultados">No se encontraron productos.</p>
      ) : (
        <section className="catalogo">
          {productosOrdenados.map((producto) => (
            <Producto
              key={producto.id}
              producto={producto}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              categoria={producto.categoria}
              imagen={producto.imagen}
              onEliminar={eliminarProducto}
              onModificarStock={modificarStock}
              onEditar={editarProducto}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;