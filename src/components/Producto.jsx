export default function Producto({ nombre, descripcion, precio }) {
  return (
    <article className="producto">
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <strong>${precio}</strong>
    </article>
  );
}