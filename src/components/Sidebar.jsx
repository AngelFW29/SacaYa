import { NavLink } from "react-router-dom";
import { House, Calendar, MapPin, TriangleAlert, Truck } from "lucide-react";

const navItems = [
  { to: "/", label: "Inicio", Icon: House },
  { to: "/calendario", label: "Calendario", Icon: Calendar },
  { to: "/rutas", label: "Rutas", Icon: MapPin },
  { to: "/reportar", label: "Reportar", Icon: TriangleAlert },
];

function Sidebar() {
  return (
    <aside className="hidden md:flex w-20 lg:w-56 bg-green-deep flex-col p-4 lg:p-6 sticky top-0 h-screen shrink-0">
      <div className="flex items-center justify-center lg:justify-start gap-2 font-display font-semibold text-white text-lg px-0 lg:px-2 mb-1">
        <Truck
          size={20}
          strokeWidth={1.8}
          className="text-green-light shrink-0"
        />
        <span className="hidden lg:inline">SacaYa</span>
      </div>
      <p className="hidden lg:block text-xs text-green-light px-2 mb-8">
        Tu ruta de limpieza, en tiempo real.
      </p>
      <div className="lg:hidden mb-6" />

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            title={label}
            className={({ isActive }) =>
              `flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={18} strokeWidth={1.8} className="shrink-0" />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 hidden lg:block">
        <p className="text-xs leading-relaxed text-white/55">
          SDE más limpia, responsabilidad de todos.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
