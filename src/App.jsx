import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Inicio from "./pages/inicio";
import Inventario from "./pages/inventario";
import NuevoProducto from "./pages/nuevoproducto";
import DetalleProducto from "./pages/detalleproducto";
import Acerca from "./pages/acerca";
import NoEncontrado from "./pages/no_encontrado";

import { useState, useEffect } from "react";
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
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setProductos(productos.filter((producto) => producto.id !== id));
      setMensaje("Producto eliminado.");
    }
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

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroEstado("Todos");
    setOrden("");
    setCategoriaActiva("Todos");
    setMensaje("Filtros limpiados.");
  };

  const productosAgotados = productos.filter((p) => p.stock === 0).length;
  const valorInventario = productos.reduce(
    (total, producto) => total + producto.precio * (producto.stock || 0),
    0
  );

  const productoMasCostoso =
    productos.length > 0
      ? productos.reduce((max, p) => (p.precio > max.precio ? p : max))
      : null;

  let productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  if (filtroEstado === "Disponibles") {
    productosFiltrados = productosFiltrados.filter((p) => p.stock > 0);
  } else if (filtroEstado === "Agotados") {
    productosFiltrados = productosFiltrados.filter((p) => p.stock === 0);
  }

  if (busqueda.trim() !== "") {
    productosFiltrados = productosFiltrados.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

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
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/inventario"
          element={
            <Inventario
              productos={productosOrdenados}
              categorias={categorias}
              categoriaActiva={categoriaActiva}
              setCategoriaActiva={setCategoriaActiva}
              mensaje={mensaje}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              filtroEstado={filtroEstado}
              setFiltroEstado={setFiltroEstado}
              orden={orden}
              setOrden={setOrden}
              limpiarFiltros={limpiarFiltros}
              productoEditando={productoEditando}
              onAgregar={agregarProducto}
              onActualizar={actualizarProducto}
              onEliminar={eliminarProducto}
              onModificarStock={modificarStock}
              onEditar={editarProducto}
              totalProductos={productos.length}
              productosAgotados={productosAgotados}
              valorInventario={valorInventario}
              productoMasCostoso={productoMasCostoso}
            />
          }
        />
        <Route path="/nuevo" element={<NuevoProducto onAgregar={agregarProducto} />} />
        <Route path="/productos/:id" element={<DetalleProducto productos={productos} />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </>
  );
}

export default App;