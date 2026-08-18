import { Link } from "react-router-dom";
import { useSector } from "../context/SectorContext";
import { calcularProximaRecogida, formatDiasRecogida } from "../utils/fechas";
import { calcularDistanciaYTiempo } from "../utils/distancia";
import estacion from "../data/estacion.json";
import PageHeader from "../components/PageHeader";
import EstadoVacioSector from "../components/EstadoVacioSector";

function Inicio() {
  const { sector } = useSector();

  if (!sector) {
    return (
      <div>
        <PageHeader title="¿Cuándo pasa por mi sector?" />
        <EstadoVacioSector mensaje="Selecciona tu sector arriba para conocer tu horario de recogida." />
      </div>
    );
  }

  const recogida = calcularProximaRecogida(sector);
  const distancia = calcularDistanciaYTiempo(sector, estacion);

  return (
    <div>
      <PageHeader
        eyebrow={`${sector.nombre}`}
        title="¿Cuándo pasa por mi sector?"
      />

      {/* HERO: próxima recogida */}
      <div className="bg-green-deep rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-11 min-h-[180px] md:min-h-[220px] flex flex-col justify-center">
        <span className="text-[11px] md:text-xs font-bold tracking-wide uppercase text-green-light mb-2 md:mb-3">
          Próxima recogida
        </span>
        <div className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight md:leading-none tracking-tight">
          {recogida.diaLabel} · {recogida.horaInicio}
        </div>
        <p className="text-white/65 text-xs md:text-sm mt-2 md:mt-3">
          Horario habitual: {recogida.horaInicio} – {recogida.horaFin}
        </p>

        {recogida.esHoy && (
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4 md:mt-6">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-white/10 rounded-full pl-2.5 pr-3.5 py-1.5 md:py-2">
              <span className="w-2 h-2 rounded-full shrink-0 bg-[#6FD98A]" />
              Servicio en ruta
            </span>
            <span className="text-xs md:text-sm text-white/60">
              El camión recorre tu sector
            </span>
          </div>
        )}
      </div>

      {/* Distancia a la estación */}
      {distancia && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between bg-surface-alt border border-line rounded-2xl px-5 md:px-6 py-4 md:py-5">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-green-pale flex items-center justify-center shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1F3D2E"
                strokeWidth="1.8"
                className="md:w-5 md:h-5"
              >
                <rect x="1" y="8" width="13" height="9" rx="1.5" />
                <path d="M14 11H18L21 14V17H14V11Z" />
                <circle cx="6" cy="18.5" r="1.6" />
                <circle cx="17.5" cy="18.5" r="1.6" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-text">
                El camión sale de la estación de transferencia
              </div>
              <div className="text-xs md:text-sm text-text-soft mt-0.5">
                A {distancia.km} km de tu sector · aprox. {distancia.minutos}{" "}
                min de recorrido
              </div>
            </div>
          </div>
          <Link
            to="/rutas"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-deep hover:gap-2.5 transition-all shrink-0"
          >
            Ver ruta en tiempo real
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M9 6L15 12L9 18" />
            </svg>
          </Link>
        </div>
      )}

      {/* Frecuencia habitual */}
      <div className="mt-4 bg-surface border border-line rounded-2xl px-5 md:px-6 py-4 md:py-5">
        <span className="text-xs font-bold uppercase tracking-wide text-text-soft">
          Frecuencia habitual
        </span>
        <div className="text-sm font-semibold text-text mt-1.5">
          {formatDiasRecogida(sector.diasRecogida)}
        </div>
      </div>

      <p className="mt-6 text-xs text-text-faint max-w-md">
        Los horarios son aproximados y pueden variar por condiciones del
        servicio.
      </p>
    </div>
  );
}

export default Inicio;
