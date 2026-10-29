
const patrones = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,60}$/,

  boleta: /^\d{10}$/,

  fecha: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
};

const mensajes = {
  nombre: 'Solo letras y espacios, entre 2 y 60 caracteres.',
  boleta: 'Debe tener exactamente 10 dígitos numéricos.',
  fecha: 'Formato esperado: DD/MM/AAAA (ej. 05/09/2026).',
};

function validarCampo(campo, valor) {
  return patrones[campo].test(valor.trim());
}

// El resto de este archivo (DOM) solo corre en el navegador.
if (typeof document !== 'undefined') {
  const formulario = document.getElementById('form-registro');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let formularioValido = true;

    for (const campo of Object.keys(patrones)) {
      const input = document.getElementById(campo);
      const spanError = document.getElementById(`error-${campo}`);
      const esValido = validarCampo(campo, input.value);

      input.classList.toggle('invalido', !esValido);
      spanError.textContent = esValido ? '' : mensajes[campo];
      if (!esValido) formularioValido = false;
    }

    const mensajeExito = document.getElementById('mensaje-exito');
    mensajeExito.textContent = formularioValido
      ? '✓ Formulario válido — listo para enviar al backend.'
      : '';
  });
}

// Exportado para Node — te permite probar tus patrones con
// `node validaciones.js` (agrega tus propios casos de prueba abajo).
if (typeof module !== 'undefined') {
  module.exports = { patrones, mensajes, validarCampo };
}