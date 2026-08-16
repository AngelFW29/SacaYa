import { createContext, useContext, useState } from "react";
import sectores from "../data/sectores.json";

const SectorContext = createContext(null);

export function SectorProvider({ children }) {
  const [sectorId, setSectorId] = useState(null);

  const sector = sectores.find((s) => s.id === sectorId) || null;

  const value = { sectores, sector, sectorId, setSectorId };

  return (
    <SectorContext.Provider value={value}>{children}</SectorContext.Provider>
  );
}

export function useSector() {
  const context = useContext(SectorContext);
  if (!context) {
    throw new Error("useSector debe usarse dentro de un SectorProvider");
  }
  return context;
}
