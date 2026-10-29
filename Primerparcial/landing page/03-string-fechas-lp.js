const reporteTexto = "   Lote #405: Manzana imperfecta; Estado: Bueno; Zona: Oriente.   ";

const textoLimpio = reporteTexto.trim();
console.log("Texto limpio:", `"${textoLimpio}"`);

const partes = textoLimpio.split(";");
console.log("Partes del reporte:", partes);

const esUrgente = textoLimpio.includes("Manzana");
console.log("¿Contiene 'Manzana'?:", esUrgente);

const textoModificado = textoLimpio.replace("Bueno", "Excelente");
console.log("Texto modificado:", textoModificado);

const fechaPublicacion = new Date();
const fechaCaducidad = new Date();
fechaCaducidad.setHours(fechaPublicacion.getHours() + 48);

console.log("\nRegistro de Tiempos");
console.log("Fecha de publicación:", fechaPublicacion.toISOString());
console.log("Fecha límite de rescate:", fechaCaducidad.toISOString());