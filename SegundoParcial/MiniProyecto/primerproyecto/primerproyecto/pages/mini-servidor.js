// Mini-servidor: esta página se genera en el SERVIDOR de Next cada vez que se pide (getServerSideProps).
export async function getServerSideProps() {
  return {
    props: {
      horaServidor: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
      versionNode: process.version,
    },
  };
}

export default function MiniServidor({ horaServidor, versionNode }) {
  return (
    <main>
      <h1>Mini-servidor</h1>
      <p>Esta información la calculó el servidor de Next, no el navegador.</p>
      <ul>
        <li><strong>Hora del servidor:</strong> {horaServidor}</li>
        <li><strong>Versión de Node:</strong> {versionNode}</li>
      </ul>
      <p>Recarga la página: la hora cambia porque el servidor la vuelve a calcular en cada petición.</p>
    </main>
  );
}
