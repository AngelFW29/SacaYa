const ESTILOS = {
  "en-ruta": {
    bg: "bg-green-pale",
    text: "text-green-deep",
    dot: "bg-[#3E9B57]",
    label: "En ruta",
  },
  proximamente: {
    bg: "bg-amber-pale",
    text: "text-[#9A6A25]",
    dot: "bg-amber",
    label: "Próximamente",
  },
  programada: {
    bg: "bg-[#E4E7DE]",
    text: "text-[#3A4235]",
    dot: "bg-[#8A9184]",
    label: "Programada",
  },
  afectado: {
    bg: "bg-[#FBE7E3]",
    text: "text-[#B2492E]",
    dot: "bg-[#D2603F]",
    label: "Servicio afectado",
  },
};

function StatusBadge({ estado, texto }) {
  const estilo = ESTILOS[estado] ?? ESTILOS.programada;

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs md:text-sm font-bold rounded-full pl-2.5 pr-3.5 py-1.5 md:py-2 ${estilo.bg} ${estilo.text}`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${estilo.dot}`} />
      {texto ?? estilo.label}
    </span>
  );
}

export default StatusBadge;
