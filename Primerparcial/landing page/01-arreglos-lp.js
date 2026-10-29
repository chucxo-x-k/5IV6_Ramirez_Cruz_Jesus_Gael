const lotesAlimentos = [
    { id: 1, tipo: "Fruta", cantidadKg: 50, horasCaducidad: 12, donante: "Mercado Central" },
    { id: 2, tipo: "Verdura", cantidadKg: 30, horasCaducidad: 48, donante: "Tienda San José" },
    { id: 3, tipo: "Panadería", cantidadKg: 20, horasCaducidad: 6, donante: "Panificadora El Sol" },
    { id: 4, tipo: "Lácteos", cantidadKg: 15, horasCaducidad: 24, donante: "SuperSur" }
];

const donantes = lotesAlimentos.map(lote => lote.donante);
console.log("Donantes:", donantes);

const urgentes = lotesAlimentos.filter(lote => lote.horasCaducidad <= 24);
console.log("Lotes urgentes:", urgentes);

const totalKg = lotesAlimentos.reduce((acum, lote) => acum + lote.cantidadKg, 0);
console.log("Total Kg rescatados:", totalKg);

const lotePan = lotesAlimentos.find(lote => lote.tipo === "Panadería");
console.log("Lote encontrado:", lotePan);

console.log("\nResumen de Lotes");
lotesAlimentos.forEach(lote => {
    console.log(`Lote #${lote.id}: ${lote.cantidadKg}kg de ${lote.tipo} (${lote.horasCaducidad}h restantes)`);
});