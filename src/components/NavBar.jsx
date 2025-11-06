import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
//import api from "../api/api";
import "../style/NavBar.css";

const linkStyle = {
  marginRight: 16,
  textDecoration: "none", 
  color: "#333",
  fontWeight: 500,
};

const activeStyle = {
  color: "#0b5ed7",
  textDecoration: "underline",
};

export default function Navbar() {
  // const [grupoVeiculos, setGrupoVeiculos] = useState([]);
  // const [empresasAssistencia, setEmpresasAssistencia] = useState([]);
  // const [planoAssistencia, setPlanoAssistencia] = useState([]);
  // const [veiculo, setVeiculos] = useState([]);
  
  // const carregarGrupoVeiculos = async () => {
  //   try {
  //     const res = await api.get("/GrupoVeiculo");
  //     setGrupoVeiculos(res.data);
  //   } catch (err) {
  //     console.error("Erro ao buscar grupos de veículos:", err);
  //   }
  //   finally{
  //     console.clear();
  //   }
  // };
  // const carregarEmpresas = async () => {
  //   try {
  //     const res = await api.get("/EmpresaAssistencia");
  //     setEmpresasAssistencia(res.data);
  //   } catch (err) {
  //     console.error("Erro ao buscar empresas de assistência:", err);
  //   }finally{
  //     console.clear();
  //   }
  // };
  // const carregarVeiculos = async () => {
  //   try {
  //     const res = await api.get("/Veiculo");
  //     setVeiculos(res.data);
  //   } catch (err) {
  //     console.error("Erro ao buscar grupos de veículos:", err);
  //   }finally{
  //     console.clear();
  //   }
  // };
  // const carregarPlanos = async () => {
  //   try {
  //     const res = await api.get("/PlanoAssistencia");
  //     setPlanoAssistencia(res.data);
  //   } catch (err) {
  //     console.error("Erro ao buscar empresas de assistência:", err);
  //   }finally{
  //     console.clear();
  //   }
  // };
  
  // useEffect(() => {
  //   carregarGrupoVeiculos();
  //   carregarEmpresas();
  //   carregarPlanos();
  //   carregarVeiculos();
  // }, []);

  return (
    <header>
    
      <nav style={{ marginLeft: 8, alignItems: "space-between"}}>
        <NavLink to="/" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          <span style={{fontWeight: 700}}>Sistema de alocação de veículo</span>
        </NavLink>
        <NavLink to="/veiculos" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Veículos
        </NavLink>
        <NavLink to="/veiculosAssistencia" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Veículos com assistência
        </NavLink>
        <NavLink to="/planosAssistencia" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Planos de assistência
        </NavLink>
        <NavLink to="/empresaAssistencia" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Empresas de assistência
        </NavLink>
        <NavLink to="/grupoVeiculos" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Grupo de veículo
        </NavLink>
      </nav>
    </header>
  );
}
