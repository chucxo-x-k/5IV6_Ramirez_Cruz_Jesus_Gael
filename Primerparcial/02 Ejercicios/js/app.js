const talleres = [
    { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
    { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
    { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
    { nombre: 'Desarrollo Web con JavaScript', instructor: 'Ing. Maria Lopez', cupo: 25, inscritos: 10 },
];

function pintarTabla() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    talleres.forEach((taller) => {
        tbody.innerHTML += `
            <tr>
                <td>${taller.nombre}</td>
                <td>${taller.instructor}</td>
                <td>${taller.cupo}</td>
                <td>${taller.inscritos}</td>
            </tr>
        `;
    });
}

pintarTabla();

const formArreglos = document.getElementById('form-arreglos');
const resultadoArreglos = document.getElementById('resultado-arreglo');
const selectOperacionArreglos = document.getElementById('operacion-arreglo');


formArreglos.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const operacion =  selectOperacionArreglos.value;
    let resultado = '';

    switch (operacion) {
        case 'forEach':
            talleres.forEach((taller) => {
                resultado += `- ${taller.nombre}\n`;
            });
            break;

        case 'map':
            const nombres = talleres.map((taller) => taller.nombre);
            resultado = nombres.map((nombre) => `- ${nombre}`).join('\n');
            break;

        case 'filter':
            const llenos = talleres.filter((taller) => taller.inscritos >= taller.cupo);
            resultado = llenos.map((taller) => `- ${taller.nombre}`).join('\n');
            break;

        case 'find':
            const primerTallerMaria = talleres.find((taller) => 
                taller.instructor.includes('Maria Lopez') || taller.instructor.includes('María López')
            );
            resultado = primerTallerMaria ? `- ${primerTallerMaria.nombre}` : 'No se encontró un taller con instructor Maria Lopez';
            break;

        case 'reduce':
            resultado = talleres.reduce((total, taller) => total + taller.cupo, 0);
            break;

        case 'filter-map':
        case 'filterMap':
            const talleresConCupoDisponible = talleres
            .filter((taller) => taller.inscritos < taller.cupo)
            .map((taller) => `- ${taller.nombre}`);
            resultado = talleresConCupoDisponible.join('\n');
            break;

        default:
            resultado = 'Operación no válida';
    }
    resultadoArreglos.textContent = resultado;
});

const formularioObjetos = document.getElementById('form-objeto');
const resultadoObjeto = document.getElementById('resultado-objeto');

formularioObjetos.addEventListener('submit', (evento) => {
});

    // necesitamos contruir el objetp del taller
    const taller ={
        nombre : document.getElementById('obj-nombre').value,
        instructor : document.getElementById('obj-instructor').value,
        cupo : Number(document.getElementById('obj-cupo').value),
        inscritos : Number(document.getElementById('obj-inscritos').value)
    };

    const operacion =  document.getElementById('operacion-objeto').value;

    let resultado;

    switch(operacion){
        case 'keys':
            resultado = JSON.stringify(Object.keys(taller));
            break;
        case 'values':
            resultado = JSON.stringify(Object.values(taller));
            break;

        case 'entries':
            resultado = JSON.stringify(Object.entries(taller));
            break;

        case 'stringify':
            const textoJson = JSON.stringify(taller, null, 2);
            resultado = `${textoJson}\n \n tipo: ${typeof textoJson}`;
            break;
            
        case 'roundtrip':
            const textoJsons = JSON.stringify(taller, null, 2);
            const objetoDevuelta = JSON.parse(textoJsons);

            resultado = [
                textoJsons, 
                '',
                `tipo:${typeof objetoDevuelta}`,
                objetoDevuelta.nombre
            ].join('\n');
            break;
    }
    resultadoObjeto.textContent = resultado;