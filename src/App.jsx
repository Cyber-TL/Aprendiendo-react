import Producto from "./components/Producto";
import "./App.css";

const productos = [
  { id: 1, nombre: "Labial mate", descripcion: "Color rojo de larga duración", precio: 18000 },
  { id: 2, nombre: "Crema facial", descripcion: "Hidratación profunda", precio: 26000 },
  { id: 3, nombre: "Perfume", descripcion: "Fragancia floral", precio: 42000 },
  { id: 4, nombre: "Set de brochas", descripcion: "Kit de 5 brochas profesionales", precio: 35000 },
  { id: 5, nombre: "Sombra de ojos", descripcion: "Paleta de tonos neutros", precio: 22000 },
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
          />
        ))}
      </section>
    </main>
  );
}

export default App;