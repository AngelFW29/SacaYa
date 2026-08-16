import { useState } from "react";
import {
  Trash2,
  Clock,
  TriangleAlert,
  UserRound,
  Lightbulb,
  MoreHorizontal,
  Check,
  Paperclip,
} from "lucide-react";
import { useSector } from "../context/SectorContext";
import EstadoVacioSector from "../components/EstadoVacioSector";
import PageHeader from "../components/PageHeader";
import tiposReporte from "../data/tiposReporte.json";

const ICONOS = {
  "no-paso": Trash2,
  "llego-tarde": Clock,
  "problema-servicio": TriangleAlert,
  comportamiento: UserRound,
  sugerencia: Lightbulb,
  otro: MoreHorizontal,
};

const CAMPO_BASE = "border rounded-xl px-3.5 py-2.5 text-sm bg-bg outline-none";
const ERROR_BORDE = "border-[#D2603F]";
const NORMAL_BORDE = "border-line";

function CampoError({ mensaje }) {
  if (!mensaje) return null;
  return <span className="text-xs text-[#B2492E]">{mensaje}</span>;
}

function TarjetaTipoReporte({ tipo, activo, onSelect }) {
  const Icono = ICONOS[tipo.id];

  return (
    <button
      onClick={() => onSelect(tipo.id)}
      className={`text-left rounded-2xl p-4 sm:p-5 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2.5 border transition-colors ${
        activo
          ? "bg-green-pale border-green text-green-deep"
          : "bg-surface-alt border-line hover:border-green-mid"
      }`}
    >
      <Icono size={22} strokeWidth={1.8} className="shrink-0" />
      <span className="text-sm font-bold">{tipo.label}</span>
    </button>
  );
}

function ConfirmacionEnvio({ sectorNombre, onNuevoReporte }) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="w-14 h-14 rounded-full bg-green-pale flex items-center justify-center mb-4">
        <Check size={26} strokeWidth={2.2} className="text-green-deep" />
      </div>
      <p className="font-display text-lg font-semibold text-green-deep mb-1.5">
        Reporte enviado
      </p>
      <p className="text-sm text-text-soft max-w-xs">
        Gracias por ayudarnos a mejorar el servicio en {sectorNombre}. Tu
        reporte fue registrado correctamente.
      </p>
      <button
        onClick={onNuevoReporte}
        className="mt-6 text-sm font-semibold text-green-deep border border-line rounded-xl px-5 py-2.5 hover:bg-bg transition-colors"
      >
        Enviar otro reporte
      </button>
    </div>
  );
}

function FormularioReporte({
  tipoActivo,
  sector,
  sectores,
  setSectorId,
  fecha,
  setFecha,
  descripcion,
  setDescripcion,
  imagen,
  setImagen,
  errores,
  limpiarError,
  onSubmit,
}) {
  const IconoTipo = ICONOS[tipoActivo.id];

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-9 h-9 rounded-lg bg-green-pale flex items-center justify-center text-green-deep">
          <IconoTipo size={20} strokeWidth={1.8} />
        </div>
        <span className="font-display text-base font-semibold text-green-deep">
          {tipoActivo.label}
        </span>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-text-soft">
          Sector
        </span>
        <select
          value={sector.id}
          onChange={(e) => setSectorId(e.target.value)}
          className={`${CAMPO_BASE} ${NORMAL_BORDE}`}
        >
          {sectores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-text-soft">
          Fecha
        </span>
        <input
          type="date"
          value={fecha}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setFecha(e.target.value);
            limpiarError("fecha");
          }}
          className={`${CAMPO_BASE} ${errores.fecha ? ERROR_BORDE : NORMAL_BORDE}`}
        />
        <CampoError mensaje={errores.fecha} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-text-soft">
          Cuéntanos qué ocurrió
        </span>
        <textarea
          value={descripcion}
          onChange={(e) => {
            setDescripcion(e.target.value);
            limpiarError("descripcion");
          }}
          placeholder="Escribe una descripción..."
          rows={4}
          className={`${CAMPO_BASE} resize-none placeholder:text-text-faint ${
            errores.descripcion ? ERROR_BORDE : NORMAL_BORDE
          }`}
        />
        <CampoError mensaje={errores.descripcion} />
      </label>

      <label className="flex items-center gap-2 border border-dashed border-line rounded-xl px-3.5 py-3 text-sm text-text-soft cursor-pointer hover:border-green-mid transition-colors">
        <Paperclip size={15} strokeWidth={1.8} className="shrink-0" />
        <span className="truncate">
          {imagen ? imagen.name : "Adjuntar imagen (opcional)"}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImagen(e.target.files[0] ?? null)}
        />
      </label>

      <button
        type="submit"
        className="bg-green-deep text-white text-sm font-semibold rounded-xl py-3 mt-1.5 hover:bg-green transition-colors"
      >
        Enviar reporte
      </button>
    </form>
  );
}

function Reportar() {
  const { sector, sectores, setSectorId } = useSector();
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState(null);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [huboEnvioPrevio, setHuboEnvioPrevio] = useState(false);

  if (!sector) {
    return (
      <div>
        <PageHeader
          title="¿Qué ocurrió?"
          subtitle="Ayúdanos a mejorar el servicio de recogida en tu sector."
        />
        <EstadoVacioSector mensaje="Selecciona tu sector arriba para enviar un reporte." />
      </div>
    );
  }
  function limpiarError(campo) {
    setErrores((prev) =>
      prev[campo] ? { ...prev, [campo]: undefined } : prev,
    );
  }

  function handleEnviar(e) {
    e.preventDefault();

    const nuevosErrores = {};
    if (!fecha) nuevosErrores.fecha = "Selecciona la fecha en que ocurrió.";
    if (!descripcion.trim())
      nuevosErrores.descripcion = "Cuéntanos brevemente qué pasó.";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    setEnviado(true);
  }

  function handleNuevoReporte() {
    setEnviado(false);
    setTipoSeleccionado(null);
    setDescripcion("");
    setFecha("");
    setImagen(null);
    setErrores({});
    setHuboEnvioPrevio(true);
  }

  const tipoActivo = tiposReporte.find((t) => t.id === tipoSeleccionado);

  return (
    <div>
      <PageHeader
        title="¿Qué ocurrió?"
        subtitle="Ayúdanos a mejorar el servicio de recogida en tu sector."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 lg:gap-8 items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tiposReporte.map((tipo) => (
            <TarjetaTipoReporte
              key={tipo.id}
              tipo={tipo}
              activo={tipo.id === tipoSeleccionado}
              onSelect={setTipoSeleccionado}
            />
          ))}
        </div>

        <div className="bg-surface-alt border border-line rounded-2xl md:rounded-3xl p-5 md:p-7">
          {enviado ? (
            <ConfirmacionEnvio
              sectorNombre={sector.nombre}
              onNuevoReporte={handleNuevoReporte}
            />
          ) : !tipoActivo ? (
            <p className="text-sm text-text-faint text-center py-10">
              {huboEnvioPrevio
                ? "Tu reporte anterior fue enviado. Selecciona una opción para reportar algo más."
                : "Selecciona una opción a la izquierda para continuar."}
            </p>
          ) : (
            <FormularioReporte
              tipoActivo={tipoActivo}
              sector={sector}
              sectores={sectores}
              setSectorId={setSectorId}
              fecha={fecha}
              setFecha={setFecha}
              descripcion={descripcion}
              setDescripcion={setDescripcion}
              imagen={imagen}
              setImagen={setImagen}
              errores={errores}
              limpiarError={limpiarError}
              onSubmit={handleEnviar}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reportar;
