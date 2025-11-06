import { NavLink } from "react-router-dom";
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
