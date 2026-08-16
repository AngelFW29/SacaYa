const DIAS_SEMANA = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];
const DIAS_SEMANA_LABEL = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

// Convierte "14:30" -> "2:30 p.m."
export function formatHora12(horaStr) {
  const [h, m] = horaStr.split(":").map(Number);
  const periodo = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mm = m.toString().padStart(2, "0");
  return `${h12}:${mm} ${periodo}`;
}

// Dado un sector (con diasRecogida y horario), calcula la próxima recogida
// a partir de "ahora". Devuelve { esHoy, fecha, diaLabel, horaInicio, horaFin }
export function calcularProximaRecogida(sector, ahora = new Date()) {
  if (!sector) return null;

  const { diasRecogida, horario } = sector;
  const diaActualIndex = ahora.getDay(); // 0 = domingo
  const [hInicio, mInicio] = horario.inicio.split(":").map(Number);

  // Convertimos los días de recogida (strings) a índices 0-6
  const indicesRecogida = diasRecogida
    .map((d) => DIAS_SEMANA.indexOf(d))
    .sort((a, b) => a - b);

  // ¿Hoy es día de recogida Y aún no pasó la hora de inicio?
  const horaLimiteHoy = new Date(ahora);
  horaLimiteHoy.setHours(hInicio, mInicio, 0, 0);

  if (indicesRecogida.includes(diaActualIndex) && ahora <= horaLimiteHoy) {
    return {
      esHoy: true,
      fecha: new Date(ahora),
      diaLabel: "Hoy",
      horaInicio: formatHora12(horario.inicio),
      horaFin: formatHora12(horario.fin),
    };
  }

  // Si no, buscamos el próximo día de recogida (empezando mañana)
  for (let i = 1; i <= 7; i++) {
    const candidato = new Date(ahora);
    candidato.setDate(ahora.getDate() + i);
    if (indicesRecogida.includes(candidato.getDay())) {
      const dia = candidato.getDate();
      const mes = MESES[candidato.getMonth()];
      const diaSemana = DIAS_SEMANA_LABEL[candidato.getDay()];
      return {
        esHoy: false,
        fecha: candidato,
        diaLabel: `${diaSemana} ${dia} de ${mes}`,
        horaInicio: formatHora12(horario.inicio),
        horaFin: formatHora12(horario.fin),
      };
    }
  }

  return null; // no debería pasar si diasRecogida tiene al menos un día
}

// Traduce los días guardados ("martes","jueves","sabado") a texto legible
// "Martes · Jueves · Sábado"
export function formatDiasRecogida(diasRecogida) {
  return diasRecogida
    .map((d) => DIAS_SEMANA_LABEL[DIAS_SEMANA.indexOf(d)])
    .join(" · ");
}
