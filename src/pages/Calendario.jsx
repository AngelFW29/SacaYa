import { useState } from "react";
import { useSector } from "../context/SectorContext";
import { formatDiasRecogida, formatHora12 } from "../utils/fechas";
import {
  generarCeldasMes,
  getMesLabel,
  formatFechaLarga,
} from "../utils/calendario";
import PageHeader from "../components/PageHeader";
import EstadoVacioSector from "../components/EstadoVacioSector";

const DIAS_HEADER = ["L", "M", "M", "J", "V", "S", "D"];
const DIAS_SEMANA = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

function Calendario() {
  const { sector } = useSector();
  const hoy = new Date();

  const [anio, setAnio] = useState(hoy.getFullYear());
  const [mesIndex, setMesIndex] = useState(hoy.getMonth());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  if (!sector) {
    return (
      <div>
        <PageHeader
          title="Calendario de recogida"
          subtitle="Consulta los días y horarios habituales de tu sector."
        />
        <EstadoVacioSector mensaje="Selecciona tu sector arriba para ver tu calendario de recogida." />
      </div>
    );
  }

  const celdas = generarCeldasMes(anio, mesIndex, sector.diasRecogida, hoy);

  function cambiarMes(delta) {
    let nuevoMes = mesIndex + delta;
    let nuevoAnio = anio;
    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAnio -= 1;
    } else if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAnio += 1;
    }
    setMesIndex(nuevoMes);
    setAnio(nuevoAnio);
    setDiaSeleccionado(null);
  }

  return (
    <div>
      <PageHeader
        title="Calendario de recogida"
        subtitle="Consulta los días y horarios habituales de tu sector."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.9fr] gap-5 lg:gap-6 items-start">
        {/* CALENDARIO */}
        <div className="bg-surface-alt border border-line rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => cambiarMes(-1)}
                className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-line flex items-center justify-center hover:bg-bg transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5B6459"
                  strokeWidth="2.5"
                >
                  <path d="M15 6L9 12L15 18" />
                </svg>
              </button>
              <span className="font-display font-semibold text-base md:text-lg text-green-deep">
                {getMesLabel(mesIndex)} {anio}
              </span>
              <button
                onClick={() => cambiarMes(1)}
                className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-line flex items-center justify-center hover:bg-bg transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5B6459"
                  strokeWidth="2.5"
                >
                  <path d="M9 6L15 12L9 18" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-text-soft">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3D6B4F"
                strokeWidth="2"
              >
                <rect x="1" y="8" width="13" height="9" rx="1.5" />
                <path d="M14 11H18L21 14V17H14V11Z" />
              </svg>
              Día de recogida
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {DIAS_HEADER.map((d, i) => (
              <div
                key={i}
                className="text-center text-[10px] md:text-xs font-semibold text-text-faint py-1 md:py-1.5"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {celdas.map((celda, i) => {
              if (celda.dia === null) return <div key={i} />;
              const seleccionada =
                diaSeleccionado &&
                diaSeleccionado.getTime() === celda.fecha.getTime();

              return (
                <button
                  key={i}
                  onClick={() => setDiaSeleccionado(celda.fecha)}
                  className={`aspect-square rounded-lg md:rounded-xl flex flex-col items-center justify-center gap-0.5 text-xs md:text-sm transition-colors
                    ${celda.esRecogida ? "bg-green-pale font-bold text-green-deep" : "text-text hover:bg-bg"}
                    ${celda.esHoy ? "ring-1.5 ring-green-deep" : ""}
                    ${seleccionada ? "ring-2 ring-green" : ""}
                  `}
                >
                  <span>{celda.dia}</span>
                  {celda.esRecogida && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1F3D2E"
                      strokeWidth="2"
                      className="md:w-[11px] md:h-[11px]"
                    >
                      <rect x="1" y="8" width="13" height="9" rx="1.5" />
                      <path d="M14 11H18L21 14V17H14V11Z" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESUMEN LATERAL */}
        <div>
          <div className="bg-green-deep rounded-2xl md:rounded-3xl p-5 md:p-7 text-white">
            <span className="text-[11px] md:text-xs font-bold tracking-wide uppercase text-green-light">
              Tu horario habitual
            </span>
            <div className="font-display text-lg md:text-xl font-semibold mt-2 md:mt-2.5">
              {formatDiasRecogida(sector.diasRecogida)}
            </div>
            <div className="text-sm text-white/70 mt-1.5">
              {formatHora12(sector.horario.inicio)} –{" "}
              {formatHora12(sector.horario.fin)}
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/15 text-xs text-white/60">
              Frecuencia: {sector.diasRecogida.length} veces por semana
            </div>
          </div>

          <div className="mt-4 bg-surface-alt border border-line rounded-2xl px-5 md:px-6 py-4 md:py-5">
            {diaSeleccionado ? (
              <>
                <div className="text-sm font-bold text-text">
                  {formatFechaLarga(diaSeleccionado)}
                </div>
                {sector.diasRecogida.includes(
                  DIAS_SEMANA[diaSeleccionado.getDay()],
                ) ? (
                  <>
                    <div className="flex items-center gap-2 mt-3">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3D6B4F"
                        strokeWidth="1.8"
                      >
                        <rect x="1" y="8" width="13" height="9" rx="1.5" />
                        <path d="M14 11H18L21 14V17H14V11Z" />
                      </svg>
                      <span className="text-sm text-text-soft">
                        Recogida programada
                      </span>
                    </div>
                    <div className="text-sm font-semibold mt-1 ml-6">
                      {formatHora12(sector.horario.inicio)} –{" "}
                      {formatHora12(sector.horario.fin)}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-text-soft mt-3">
                    No hay recogida programada este día.
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-text-faint">
                Selecciona un día para ver su detalle.
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-text-faint leading-relaxed">
            Los horarios son aproximados y pueden variar por condiciones del
            servicio.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Calendario;
