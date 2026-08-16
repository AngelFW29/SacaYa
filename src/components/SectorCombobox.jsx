import { MapPin } from "lucide-react";
import { useSector } from "../context/SectorContext";

function SectorCombobox() {
  const { sectores, sectorId, setSectorId } = useSector();

  return (
    <div className="flex items-center gap-2 bg-green-pale rounded-full pl-2.5 pr-3 py-2">
      <MapPin size={15} strokeWidth={2} className="text-green-deep shrink-0" />

      <select
        value={sectorId ?? ""}
        onChange={(e) => setSectorId(e.target.value || null)}
        className="bg-transparent text-sm font-semibold text-green-deep outline-none cursor-pointer pr-1"
      >
        <option value="" disabled>
          Selecciona tu sector
        </option>
        {sectores.map((s) => (
          <option key={s.id} value={s.id}>
            {s.nombre}, {s.ciudad}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SectorCombobox;
