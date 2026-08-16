# SacaYa

Prototipo de una plataforma de información y seguimiento de recogida de residuos para Santo Domingo Este.

Proyecto desarrollado para la asignatura de Diseño Centrado en el Usuario (DCU). Es un prototipo funcional con datos simulados, sin backend ni persistencia real, pensado para evaluar usabilidad.

## Funcionalidades

- **Inicio** — próxima recogida calculada dinámicamente según el sector y la hora actual, con distancia estimada desde la estación de transferencia.
- **Calendario** — vista mensual navegable con los días de recogida resaltados y detalle por día.
- **Rutas** — mapa simulado del recorrido del camión, ruta activa y rutas cercanas con estado en tiempo real.
- **Reportar** — formulario de incidencias (camión no pasó, llegó tarde, comportamiento inapropiado, entre otros) con validación y confirmación de envío.

La interfaz es completamente responsive, adaptada a móvil, tablet y escritorio.

## Stack

- [React](https://react.dev/) 19 + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [React Router](https://reactrouter.com/) — navegación entre secciones
- [Lucide React](https://lucide.dev/) — iconografía
- Gestor de paquetes: [pnpm](https://pnpm.io/)

Todos los datos (sectores, rutas, tipos de reporte) viven en archivos JSON dentro de `src/data`, sin conexión a ningún servicio externo.

## Cómo correrlo localmente

```bash
pnpm install
pnpm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Estructura del proyecto

```
src/
├── components/     # Layout, Sidebar, Topbar, BottomNav y piezas compartidas
├── context/        # Estado global del sector seleccionado
├── data/           # Sectores, rutas y tipos de reporte (JSON)
├── pages/          # Inicio, Calendario, Rutas, Reportar
└── utils/          # Cálculo de fechas, distancia y calendario
```

## Notas de diseño

- La distancia entre cada sector y la estación de transferencia se calcula con la fórmula de **Haversine** (distancia en línea recta), no con una ruta real por calles — suficiente para el propósito del prototipo, sin depender de una API externa de mapas.
- El mapa de la sección Rutas es una ilustración simulada, no un mapa real, por la misma razón.
- Paleta, tipografía e iconografía siguen un sistema de diseño propio, pensado para transmitir una identidad cívica y local, evitando la estética genérica de plantilla.

## Autor

Proyecto desarrollado por AngelFW29.
