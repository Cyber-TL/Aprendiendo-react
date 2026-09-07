import { useNavigate } from "react-router";
import FormularioProducto from "../components/FormularioProducto";

function NuevoProducto({ onAgregar }) {
  const navigate = useNavigate();

  const manejarAgregar = (nuevoProducto) => {
    onAgregar(nuevoProducto);
    navigate("/inventario"); // vuelve al inventario después de guardar
  };

  return (
    <main className="app">
      <div className="titulo-wrapper">
        <h1>Nuevo producto</h1>
      </div>
      <FormularioProducto
        onAgregar={manejarAgregar}
        onActualizar={() => {}}
        productoEditando={null}
      />
    </main>
  );
}

export default NuevoProducto;