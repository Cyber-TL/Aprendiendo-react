import { useState, useEffect } from "react";

function FormularioProducto({ onAgregar, onActualizar, productoEditando }) {
    const [formulario, setFormulario] = useState({
        nombre: "",
        categoria: "",
        precio: "",
        stock: ""
    });

    useEffect(() => {
        if (productoEditando) {
            setFormulario({
                nombre: productoEditando.nombre,
                categoria: productoEditando.categoria,
                precio: productoEditando.precio,
                stock: productoEditando.stock
            });
        }
    }, [productoEditando]);

    const manejarCambio = (evento) => {
        setFormulario({
            ...formulario,
            [evento.target.name]: evento.target.value
        });
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        if (
            formulario.nombre.trim() === "" ||
            formulario.categoria.trim() === "" ||
            Number(formulario.precio) <= 0 ||
            Number(formulario.stock) < 0
        ) {
            alert("Revisa los datos del producto");
            return;
        }

        if (productoEditando) {
            onActualizar({
                ...productoEditando,
                nombre: formulario.nombre,
                categoria: formulario.categoria,
                precio: Number(formulario.precio),
                stock: Number(formulario.stock)
            });
        } else {
            onAgregar({
                id: Date.now(),
                nombre: formulario.nombre,
                categoria: formulario.categoria,
                precio: Number(formulario.precio),
                stock: Number(formulario.stock)
            });
        }

        setFormulario({ nombre: "", categoria: "", precio: "", stock: "" });
    };

    return (
        <form className="formulario" onSubmit={manejarEnvio}>
            <h2>{productoEditando ? "Editar producto" : "Agregar producto"}</h2>
            <div className="formulario-grid">
                <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={manejarCambio} />
                <input type="text" name="categoria" placeholder="Categoría" value={formulario.categoria} onChange={manejarCambio} />
                <input type="number" name="precio" placeholder="Precio" value={formulario.precio} onChange={manejarCambio} />
                <input type="number" name="stock" placeholder="Stock" value={formulario.stock} onChange={manejarCambio} />
            </div>
            <button type="submit">{productoEditando ? "Guardar cambios" : "Agregar producto"}</button>
        </form>
    );
}

export default FormularioProducto;