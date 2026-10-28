import { useEffect, useState } from 'react';
import TarjetaTaller from '../../components/TarjetaTaller';
import estilos from '../../styles/Talleres.module.css';
import { pedirJSON } from '../../lib/api';

export default function Talleres() {
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // PASO 2.1: pedir los datos una sola vez, al abrir la página.
  useEffect(() => {
    cargarTalleres();
  }, []);

  async function cargarTalleres() {
    try {
      setTalleres(await pedirJSON('/talleres'));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  // PASO 7.1: el filtro trabaja sobre el arreglo que ya está en el estado (no vuelve a pedir nada).
  const texto = busqueda.trim().toLowerCase();
  const visibles = talleres.filter((t) => `${t.nombre} ${t.instructor || ''}`.toLowerCase().includes(texto));

  return (
    <main>
      <h1>Talleres</h1>
      {/* TU TURNO (resuelto): buscador */}
      <input
        className={estilos.buscador}
        placeholder="Buscar por nombre o instructor"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Cargando talleres…</p>}
      {error && <p className="error">{error}</p>}

      {/* TU TURNO (resuelto): mensajes de vacío */}
      {!cargando && !error && talleres.length === 0 && <p>No hay talleres registrados.</p>}
      {!cargando && !error && talleres.length > 0 && visibles.length === 0 && (
        <p>No hay talleres que coincidan con la búsqueda.</p>
      )}

      <div className={estilos.rejilla}>
        {visibles.map((t) => (
          <TarjetaTaller key={t.id} taller={t} />
        ))}
      </div>
    </main>
  );
}
