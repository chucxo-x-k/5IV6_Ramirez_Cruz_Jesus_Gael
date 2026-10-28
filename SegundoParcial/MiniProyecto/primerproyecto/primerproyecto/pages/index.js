import Link from 'next/link';

export default function Inicio() {
  return (
    <main>
      <h1>Registro de Asistencia - CECyT 9</h1>
      <p>Consulta los talleres, inscríbete y revisa tu perfil.</p>
      <ul>
        <li><Link href="/talleres">Ver talleres</Link></li>
        <li><Link href="/perfil">Mi perfil</Link></li>
        <li><Link href="/practica/1">Práctica (ruta dinámica de la semana 6)</Link></li>
      </ul>
    </main>
  );
}
