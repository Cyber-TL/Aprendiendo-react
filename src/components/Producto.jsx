export default function Producto({ producto, nombre, descripcion, precio, categoria, imagen, onEliminar, onModificarStock, onEditar }) {
  return (
    <article className="producto">
      <img src={imagen} alt={nombre} />
      <span className="categoria">{categoria}</span>
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <strong>${precio}</strong>
      {producto.stock <= 2 && <p className="stock-bajo">Stock bajo</p>}
      <div className="stock-controles">
        <button onClick={() => onModificarStock(producto.id, -1)}>-</button>
        <span>Stock: {producto.stock}</span>
        <button onClick={() => onModificarStock(producto.id, 1)}>+</button>
      </div>
      <button className="btn-editar" onClick={() => onEditar(producto)}>Editar</button>
      <button className="btn-eliminar" onClick={() => onEliminar(producto.id)}>Eliminar</button>
    </article>
  );
}