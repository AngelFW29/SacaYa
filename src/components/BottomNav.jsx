import { NavLink } from "react-router-dom";
import { House, Calendar, MapPin, TriangleAlert } from "lucide-react";

const navItems = [
  { to: "/", label: "Inicio", Icon: House },
  { to: "/calendario", label: "Calendario", Icon: Calendar },
  { to: "/rutas", label: "Rutas", Icon: MapPin },
  { to: "/reportar", label: "Reportar", Icon: TriangleAlert },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex bg-green-deep border-t border-white/10 md:hidden">
      {navItems.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-2.5 text-[10.5px] font-medium transition-colors 
          ${isActive ? "text-white" : "text-white/55"}`
          }
        >
          <Icon size={19} strokeWidth={1.8} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
