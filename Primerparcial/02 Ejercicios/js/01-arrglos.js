const talleres = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JavaScript', instructor: 'Ing. Maria Lopez', cupo: 25, inscritos: 10 },
];

talleres.forEach((taller) => {
    console.log(`- ${taller.nombre} (${taller.inscritos}/${taller.cupo})`);
});

console.log("Aplicando funcion Map con Solo Nombres:");
const nombresTalleres = talleres.map((taller) => taller.nombre);
nombresTalleres.forEach((nombre) => {
    console.log(`- ${nombre}`);
});

console.log("Aplicandio funcion Filter en los Talleres")
const llenos = talleres.filter((taller) => taller.inscritos >= taller.cupo);
console.log(llenos.map((taller) => taller.nombre))

console.log("Aplicando funcion Find");
const primerTallerMaria = talleres.find((taller) => taller.instructor.includes('Maria Lopez'));
console.log(primerTallerMaria);

console.log("Aplicando funcion Reduce");
const totalInscritos = talleres.reduce((acumulador, taller) => acumulador + taller.inscritos, 0);
console.log(`Total de inscritos: ${totalInscritos}`);

console.log("Aplicando funcion Filter + Map encadenados");
const talleresConCupoDisponible = talleres
    .filter((taller) => taller.inscritos < taller.cupo)
    .map((taller) => taller.nombre);
console.log("Talleres con cupo disponible:");
