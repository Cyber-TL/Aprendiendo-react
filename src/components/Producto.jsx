export default function Producto({ nombre, descripcion, precio, imagen }) {
  return (
    <article className="producto">
      <img src={imagen} alt={nombre} />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <strong>${precio}</strong>
    </article>
  );
}