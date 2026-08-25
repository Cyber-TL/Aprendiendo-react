import { useState } from "react";
import Producto from "./components/Producto";
import "./App.css";

import labial from "./assets/labial.jpg";
import crema from "./assets/crema.jpg";
import perfume from "./assets/perfume.jpg";
import brochas from "./assets/brochas.jpg";
import sombra from "./assets/sombra.jpg";

const productos = [
  { id: 1, nombre: "Labial mate", descripcion: "Color rojo de larga duración", precio: 18000, categoria: "Maquillaje", imagen: labial },
  { id: 2, nombre: "Crema facial", descripcion: "Hidratación profunda", precio: 26000, categoria: "Cuidado facial", imagen: crema },
  { id: 3, nombre: "Perfume", descripcion: "Fragancia floral", precio: 42000, categoria: "Fragancias", imagen: perfume },
  { id: 4, nombre: "Set de brochas", descripcion: "Kit de 5 brochas profesionales", precio: 35000, categoria: "Accesorios", imagen: brochas },
  { id: 5, nombre: "Sombra de ojos", descripcion: "Paleta de tonos neutros", precio: 22000, categoria: "Maquillaje", imagen: sombra },
];

const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <main className="app">
      <div className="titulo-wrapper">
        <h1>Catálogo Sena</h1>
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
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            categoria={producto.categoria}
            imagen={producto.imagen}
          />
        ))}
      </section>
    </main>
  );
}

export default App;