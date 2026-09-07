function Acerca() {
  return (
    <main className="app">
      <div className="acerca-card">
        <p className="hero-etiqueta">EL PROYECTO</p>
        <h1 className="acerca-titulo">Acerca de este inventario</h1>
        <p className="acerca-intro">
          Una aplicación educativa para administrar el inventario de una tienda.
        </p>

        <h2>Qué puedes hacer</h2>
        <p>
          Registrar, consultar, editar y eliminar productos; modificar stock;
          buscar, filtrar y ordenar el catálogo.
        </p>

        <h2>Cómo funciona</h2>
        <p>
          React construye la interfaz y React Router organiza las páginas.
          Los datos se conservan con localStorage en este navegador; no se
          sincronizan con otros dispositivos.
        </p>
      </div>
      <p className="acerca-footer">Taller de React Router · Datos guardados en este navegador</p>
    </main>
  );
}

export default Acerca;