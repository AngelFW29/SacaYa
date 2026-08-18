import { MapPin } from "lucide-react";
import { useSector } from "../context/SectorContext";

function SectorCombobox() {
  const { sectores, sectorId, setSectorId } = useSector();

  return (
    <div className="flex items-center gap-1.5 bg-green-pale rounded-full pl-3 pr-3.5 py-1.5 sm:py-2 flex-1 min-w-0 max-w-fit">
      <MapPin size={15} strokeWidth={2} className="text-green-deep shrink-0" />

      <select
        value={sectorId ?? ""}
        onChange={(e) => setSectorId(e.target.value || null)}
        className="bg-transparent text-sm font-semibold text-green-deep outline-none cursor-pointer w-full min-w-0 pr-2.5"
      >
        <option value="" disabled>
          Selecciona tu sector
        </option>
        {sectores.map((s) => (
          <option key={s.id} value={s.id}>
            {s.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SectorCombobox;
