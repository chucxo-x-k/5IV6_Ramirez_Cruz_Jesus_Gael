import { useRouter } from 'next/router';

// Semana 6: ruta dinámica, el id viene de la URL.
export default function Practica() {
  const router = useRouter();
  return (
    <main>
      <h1>Práctica {router.query.id}</h1>
    </main>
  );
}
