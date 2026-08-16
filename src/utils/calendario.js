const MESES_LABEL = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const DIAS_SEMANA = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

export function getMesLabel(mesIndex) {
  return MESES_LABEL[mesIndex];
}

// Genera un array de "celdas" para pintar el mes en formato L-D.
// Cada celda es { dia: number|null, esRecogida: bool, esHoy: bool, fecha: Date|null }
// dia === null representa una celda vacía de relleno antes del día 1.
export function generarCeldasMes(
  anio,
  mesIndex,
  diasRecogida,
  hoy = new Date(),
) {
  const primerDia = new Date(anio, mesIndex, 1);
  const totalDias = new Date(anio, mesIndex + 1, 0).getDate();

  // getDay(): 0=domingo..6=sabado. Queremos que la semana empiece en LUNES.
  // Convertimos: lunes=0, martes=1, ..., domingo=6
  const diaSemanaInicio = (primerDia.getDay() + 6) % 7;

  const celdas = [];

  for (let i = 0; i < diaSemanaInicio; i++) {
    celdas.push({ dia: null, esRecogida: false, esHoy: false, fecha: null });
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha = new Date(anio, mesIndex, dia);
    const nombreDiaSemana = DIAS_SEMANA[fecha.getDay()];
    const esRecogida = diasRecogida.includes(nombreDiaSemana);
    const esHoy =
      fecha.getFullYear() === hoy.getFullYear() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getDate() === hoy.getDate();

    celdas.push({ dia, esRecogida, esHoy, fecha });
  }

  return celdas;
}

export function formatFechaLarga(fecha) {
  const DIAS_LABEL = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const dia = fecha.getDate();
  const mes = MESES_LABEL[fecha.getMonth()].toLowerCase();
  const diaSemana = DIAS_LABEL[fecha.getDay()];
  return `${diaSemana} ${dia} de ${mes}`;
}
