import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import ListarVeiculos from "./pages/Veiculos/ListarVeiculos";
import FormVeiculo from "./pages/Veiculos/FormVeiculo";
import ListarPlanoAssistencia from "./pages/planosAssistencia/ListarPlanosAssistencia";
import FormPlanoAssistencia from "./pages/planosAssistencia/FormPlanosAssistencia";
import ListarGrupoVeiculos from "./pages/GrupoVeiculos/ListarGrupoVeiculos";
import FormGrupoVeiculo from "./pages/GrupoVeiculos/FormGrupoVeiculos";
import ListarEmpresaAssistencia from "./pages/EmpresasAssistencia/ListarEmpresaAssistencia";
import FormEmpresaAssistencia from "./pages/EmpresasAssistencia/FormEmpresaAssistencia";
import ListarVeiculosAssistencia from "./pages/VeiculosAssistencia/ListarVeiculosAssistencia";
import FormVeiculoAssistencia from "./pages/VeiculosAssistencia/FormVeiculosAssistencia";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veiculos" element={<ListarVeiculos />} />
          <Route path="/veiculos/novo" element={<FormVeiculo />} />
          <Route path="/veiculos/editar/:id" element={<FormVeiculo />} />

          <Route path="/planosAssistencia" element={<ListarPlanoAssistencia />} />
          <Route path="/planosAssistencia/novo" element={<FormPlanoAssistencia />} />
          <Route path="/planosAssistencia/editar/:id" element={<FormPlanoAssistencia />} />

          <Route path="/grupoVeiculos" element={<ListarGrupoVeiculos />} />
          <Route path="/grupoVeiculos/novo" element={<FormGrupoVeiculo />} />
          <Route path="/grupoVeiculos/editar/:id" element={<FormGrupoVeiculo />} />

          <Route path="/empresaAssistencia" element={<ListarEmpresaAssistencia />} />
          <Route path="/empresaAssistencia/novo" element={<FormEmpresaAssistencia />} />
          <Route path="/empresaAssistencia/editar/:id" element={<FormEmpresaAssistencia />} />

          <Route path="/veiculosAssistencia" element={<ListarVeiculosAssistencia />} />
          <Route path="/veiculosAssistencia/novo" element={<FormVeiculoAssistencia />} />
          <Route path="/veiculosAssistencia/editar/:id" element={<FormVeiculoAssistencia />} />
        </Routes>
      </main>
    </>
  );
}
