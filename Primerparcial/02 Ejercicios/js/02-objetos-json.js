const taller = {
        nombre: 'Introducción a Python',
        instructor: 'Ing. María López',
        cupo: 25,
        inscritos: 25
    }


    console. log('Manejo de objetos. keys');
    console.log(Object.keys(taller));

    console.log('Manejo de valores del objeto');
    console.log(Object.values(taller));

    console.log('Manejo de objetos por for of para entries')
    for (const [campo, valor] of Object.entries(taller)) {
        console.log(`${campo}: ${valor}`);
    }

    console.log('Manejo de conversión de objeto a String');
    const textoJSON = JSON.stringify(taller, null, 2);
    console.log(textoJSON);

    console.log('tipo:', typeof textoJSON);

    console.log('Ivertir de cadena a JSON');
    const objetodevuelta = JSON.parse
    console.log("tipo", typeof objetoDeVuelta)
    console.log(objetoDeVuelta.nombre);