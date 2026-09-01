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

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
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

  const productosAgotados = productos.filter((p) => p.stock === 0).length;
  const valorInventario = productos.reduce(
    (total, producto) => total + producto.precio * (producto.stock || 0),
    0
  );

  return (
    <main className="app">
      <div className="titulo-wrapper">
        <h1>Catálogo Sena</h1>
      </div>

      <FormularioProducto onAgregar={agregarProducto} />

      <div className="tablero">
        <p>Productos registrados: {productos.length}</p>
        <p>Productos agotados: {productosAgotados}</p>
        <p>Valor total del inventario: ${valorInventario}</p>
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

      <section className="catalogo">
        {productosFiltrados.map((producto) => (
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
          />
        ))}
      </section>
    </main>
  );
}

export default App;