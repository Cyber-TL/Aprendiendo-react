import Producto from "./components/Producto";
import "./App.css";

import labial from "./assets/labial.jpg";
import crema from "./assets/crema.jpg";
import perfume from "./assets/perfume.jpg";
import brochas from "./assets/brochas.jpg";
import sombra from "./assets/sombra.jpg";

const productos = [
  { id: 1, nombre: "Labial mate", descripcion: "Color rojo de larga duración", precio: 18000, imagen: labial },
  { id: 2, nombre: "Crema facial", descripcion: "Hidratación profunda", precio: 26000, imagen: crema },
  { id: 3, nombre: "Perfume", descripcion: "Fragancia floral", precio: 42000, imagen: perfume },
  { id: 4, nombre: "Set de brochas", descripcion: "Kit de 5 brochas profesionales", precio: 35000, imagen: brochas },
  { id: 5, nombre: "Sombra de ojos", descripcion: "Paleta de tonos neutros", precio: 22000, imagen: sombra },
];

function App() {
  return (
    <main className="app">
      <h1>Catálogo Sena</h1>
      <section className="catalogo">
        {productos.map((producto) => (
          <Producto
            key={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagen={producto.imagen}
          />
        ))}
      </section>
    </main>
  );
}

export default App;