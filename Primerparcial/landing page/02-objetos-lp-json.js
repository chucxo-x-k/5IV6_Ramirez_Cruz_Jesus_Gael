const organizacion = {
    id: "ORG-001",
    nombre: "Comedor Comunitario La Esperanza",
    tipo: "Receptor",
    verificado: true,
    ubicacion: "Zona Sur",
    capacidadPersonas: 150
};

const llaves = Object.keys(organizacion);
console.log("Propiedades del objeto:", llaves);

const valores = Object.values(organizacion);
console.log("Valores del objeto:", valores);

const entradas = Object.entries(organizacion);
console.log("Pares clave-valor:", entradas);

const jsonString = JSON.stringify(organizacion);
console.log("\nJSON Stringificado:\n", jsonString);

const objetodevuelta = JSON.parse(jsonString);
console.log("\nObjeto devuelta (Nombre):", objetodevuelta.nombre);