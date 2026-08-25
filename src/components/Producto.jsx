export default function Producto({ nombre, descripcion, precio, categoria, imagen }) {
  return (
    <article className="producto">
      <img src={imagen} alt={nombre} />
      <span className="categoria">{categoria}</span>
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <strong>${precio}</strong>
    </article>
  );
}