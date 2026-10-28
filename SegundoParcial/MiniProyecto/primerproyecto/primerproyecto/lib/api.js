// Si algún día el backend vive en otra dirección: NEXT_PUBLIC_API_URL=http://... (sin / al final)
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const BACKEND_CAIDO = 'El backend no responde. Revisa que esté encendido (npm start en su carpeta).';

// PASO 1: una sola función para hablar con el backend.
export async function pedirJSON(ruta, opciones = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}/api${ruta}`, {
      ...opciones,
      headers: { 'Content-Type': 'application/json', ...opciones.headers },
    });
  } catch {
    // Sin proxy y con el backend apagado, fetch falla antes de recibir respuesta.
    throw new Error(BACKEND_CAIDO);
  }

  // Un 204 no trae cuerpo, y con el backend apagado el proxy de Next responde 500 en texto, no en JSON.
  let datos = null;
  try {
    datos = await res.json();
  } catch {
    datos = null;
  }

  // fetch NO falla solo con 400/404/500: por eso se revisa res.ok y se lanza el error del backend.
  if (!res.ok) {
    if (datos && datos.error) throw new Error(datos.error);
    throw new Error(res.status === 500 ? BACKEND_CAIDO : `El backend respondió ${res.status}`);
  }
  return datos;
}
