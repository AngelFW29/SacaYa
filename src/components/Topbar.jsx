import { Bell, Truck } from "lucide-react";
import SectorCombobox from "./SectorCombobox";

function Topbar() {
  return (
    <div className="flex items-center justify-between gap-3 px-4 md:px-6 lg:px-9 py-3 md:py-4 border-b border-line bg-surface-alt">
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex md:hidden items-center gap-1.5 font-display font-semibold text-green-deep text-base shrink-0">
          <Truck size={18} strokeWidth={1.8} className="text-green" />
          SacaYa
        </div>
        <SectorCombobox />
      </div>

      <div className="flex items-center gap-2.5 md:gap-5 shrink-0">
        <span className="hidden sm:inline text-sm text-text-soft font-medium">
          28°C
        </span>

        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-bg border border-line flex items-center justify-center relative text-text-soft shrink-0">
          <Bell size={15} strokeWidth={2} className="md:w-4 md:h-4" />
          <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-1.5 h-1.5 rounded-full bg-amber" />
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-text shrink-0">
          <div className="w-7 h-7 rounded-full bg-green text-white text-xs font-display flex items-center justify-center shrink-0">
            MR
          </div>
          <span className="hidden md:inline">Mi cuenta</span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
