import { useState } from "react";
import { CircleHelp, Truck } from "lucide-react";
import SectorCombobox from "./SectorCombobox";
import FaqModal from "./FaqModal";

function Topbar() {
  const [faqAbierto, setFaqAbierto] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 px-3 sm:px-4 md:px-6 lg:px-9 py-3 md:py-4 border-b border-line bg-surface-alt w-full overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex md:hidden items-center gap-1.5 font-display font-semibold text-green-deep text-base shrink-0">
            <Truck size={20} strokeWidth={2} className="text-green" />
            SacaYa
          </div>
          <SectorCombobox />
        </div>

        <div className="flex items-center gap-2.5 md:gap-5 shrink-0">
          <span className="hidden sm:inline text-sm text-text-soft font-medium">
            28°C
          </span>

          <button
            onClick={() => setFaqAbierto(true)}
            className="w-9 h-9 md:w-9 md:h-10 rounded-full bg-bg border border-line flex items-center justify-center text-text-soft shrink-0 hover:bg-green-pale hover:text-green-deep hover:border-green transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
            title="Ayuda y preguntas frecuentes"
          >
            <CircleHelp size={18} strokeWidth={1.8} className="md:w-5 md:h-5" />
          </button>

          <div className="flex items-center gap-2 text-sm font-semibold text-text shrink-0">
            <div className="w-7 h-7 rounded-full bg-green text-white text-xs font-display flex items-center justify-center shrink-0">
              MR
            </div>
            <span className="hidden md:inline">Mi cuenta</span>
          </div>
        </div>
      </div>

      {faqAbierto && <FaqModal onClose={() => setFaqAbierto(false)} />}
    </>
  );
}

export default Topbar;
