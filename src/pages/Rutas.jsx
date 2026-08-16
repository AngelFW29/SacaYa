import { useSector } from "../context/SectorContext";
import EstadoVacioSector from "../components/EstadoVacioSector";
import StatusBadge from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import rutas from "../data/rutas.json";

function Rutas() {
  const { sector } = useSector();

  if (!sector) {
    return (
      <div>
        <PageHeader
          title="Rutas de recogida"
          subtitle="Consulta el recorrido de los camiones en Santo Domingo Este."
        />
        <EstadoVacioSector mensaje="Selecciona tu sector arriba para ver su ruta de recogida." />
      </div>
    );
  }

  const rutaActiva = rutas.find((r) => r.id === sector.rutaId);
  const rutasCercanas = rutas.filter((r) => r.id !== sector.rutaId);

  return (
    <div>
      <PageHeader
        title="Rutas de recogida"
        subtitle="Consulta el recorrido de los camiones en Santo Domingo Este."
      />

      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5 flex-wrap">
        <div className="flex items-center gap-2 bg-surface-alt border border-line rounded-full px-3 py-2 text-sm font-semibold text-text">
          {sector.nombre}
        </div>
        {rutaActiva && (
          <div className="flex items-center gap-2 bg-surface-alt border border-line rounded-full px-3 py-2 text-sm font-semibold text-text">
            {rutaActiva.nombre}
          </div>
        )}
        {rutaActiva && <StatusBadge estado={rutaActiva.estado} />}
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_280px] gap-0 rounded-t-2xl md:rounded-t-3xl overflow-hidden border border-line">
        {/* MAPA SIMULADO */}
        <div className="relative bg-[#EAEEE4] h-72 md:h-96 lg:h-130">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 760 520"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="760" height="520" fill="#EEF0E7" />
            <g stroke="#D9DECC" strokeWidth="10">
              <line x1="0" y1="90" x2="760" y2="90" />
              <line x1="0" y1="220" x2="760" y2="220" />
              <line x1="0" y1="360" x2="760" y2="360" />
              <line x1="0" y1="470" x2="760" y2="470" />
              <line x1="120" y1="0" x2="120" y2="520" />
              <line x1="300" y1="0" x2="300" y2="520" />
              <line x1="480" y1="0" x2="480" y2="520" />
              <line x1="640" y1="0" x2="640" y2="520" />
            </g>
            <g fill="#DCE2D2">
              <rect x="20" y="20" width="80" height="50" rx="4" />
              <rect x="150" y="20" width="120" height="50" rx="4" />
              <rect x="340" y="20" width="110" height="50" rx="4" />
              <rect x="520" y="20" width="90" height="50" rx="4" />
              <rect x="660" y="20" width="80" height="50" rx="4" />
              <rect x="20" y="240" width="80" height="100" rx="4" />
              <rect x="150" y="240" width="120" height="100" rx="4" />
              <rect x="340" y="240" width="110" height="100" rx="4" />
            </g>
            <path
              d="M40 470C120 470 140 430 180 400C220 372 260 380 300 360C340 340 350 300 400 280C450 260 470 220 470 160C470 120 500 100 540 90"
              stroke="#3D6B4F"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="180" cy="400" r="8" fill="#2C6FE0" />
            <circle cx="180" cy="400" r="14" fill="#2C6FE0" opacity="0.2" />
            <g transform="translate(392,272)">
              <circle cx="16" cy="16" r="24" fill="#3D6B4F" opacity="0.15" />
              <rect x="0" y="8" width="24" height="16" rx="3" fill="#FCFBF7" />
              <rect x="24" y="2" width="12" height="18" rx="3" fill="#3D6B4F" />
              <circle cx="8" cy="26" r="3.4" fill="#16281D" />
              <circle cx="28" cy="26" r="3.4" fill="#16281D" />
            </g>
          </svg>

          {rutaActiva && (
            <div className="absolute left-3 md:left-5 bottom-3 md:bottom-5 right-3 md:right-5 lg:max-w-100 bg-surface-alt rounded-xl md:rounded-2xl p-3.5 md:p-5 shadow-xl flex items-center gap-2.5 md:gap-3.5">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-green-pale flex items-center justify-center shrink-0">
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
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold">Camión en ruta</div>
                <div className="text-xs md:text-sm text-text-soft mt-0.5 truncate">
                  Actualizado hace 30 segundos
                </div>
              </div>
              <div className="font-display text-lg md:text-xl font-semibold text-green-deep shrink-0">
                {rutaActiva.tiempoMin} min
              </div>
            </div>
          )}
        </div>

        {/* LISTA DE RUTAS CERCANAS */}
        <div className="bg-surface-alt border-t lg:border-t-0 lg:border-l border-line p-4 md:p-5 lg:overflow-y-auto">
          <span className="text-xs font-bold uppercase tracking-wide text-text-faint">
            Rutas cercanas
          </span>
          <div className="mt-3 md:mt-3.5 flex flex-col gap-1">
            {rutaActiva && (
              <div className="p-3 rounded-xl bg-green-pale">
                <div className="text-sm font-bold text-green-deep">
                  {rutaActiva.nombre} — {rutaActiva.sector}
                </div>
                <div className="mt-2">
                  <StatusBadge
                    estado={rutaActiva.estado}
                    texto={`En ruta · ${rutaActiva.tiempoMin} min`}
                  />
                </div>
              </div>
            )}
            {rutasCercanas.map((r) => (
              <div key={r.id} className="p-3 rounded-xl">
                <div className="text-sm  font-semibold">
                  {r.nombre} — {r.sector}
                </div>
                <div className="mt-1.5">
                  <StatusBadge
                    estado={r.estado}
                    texto={`Programada · ${r.tiempoMin} min`}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-text-faint leading-relaxed">
            Los tiempos son estimados y se ajustan según el tráfico y el
            recorrido real del camión.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rutas;
