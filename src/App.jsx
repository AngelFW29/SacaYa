import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SectorProvider } from "./context/SectorContext";

import Layout from "./components/Layout";

// Pages
import Inicio from "./pages/Inicio";
import Calendario from "./pages/Calendario";
import Rutas from "./pages/Rutas";
import Reportar from "./pages/Reportar";

function App() {
  return (
    <SectorProvider>
      <BrowserRouter basename="/SacaYa">
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/rutas" element={<Rutas />} />
            <Route path="/reportar" element={<Reportar />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SectorProvider>
  );
}

export default App;
