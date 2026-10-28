// Las mismas reglas que valida el backend.
export const validarBoleta = (b) => /^\d{10}$/.test(b);
export const validarCorreo = (c) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
export const validarContrasena = (p) => typeof p === 'string' && p.length >= 8;
