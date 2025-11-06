import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Home() {
  const [grupoVeiculos, setGrupoVeiculos] = useState([]);
  const [empresasAssistencia, setEmpresasAssistencia] = useState([]);
  const carregarGrupoVeiculos = async () => {
    try {
      const res = await api.get("/GrupoVeiculo");
      setGrupoVeiculos(res.data);
    } catch (err) {
      console.error("Erro ao buscar grupos de veículos:", err);
    }
  };
  const carregarEmpresas = async () => {
    try {
      const res = await api.get("/EmpresaAssistencia");
      setEmpresasAssistencia(res.data);
    } catch (err) {
      console.error("Erro ao buscar empresas de assistência:", err);
    }
  };
  useEffect(() => {
    carregarGrupoVeiculos();
    carregarEmpresas();
  }, []);

  return (
    <div>
      <h1>Sistema de alocação</h1>
      <p>Gerenciamento de veículos e plano de assistência</p>
      {grupoVeiculos.length == 0 ? (
        <p>Parece que nenhum grupo de veículo foi cadastrado ainda!</p>
      ):(<></>)}
      {empresasAssistencia.length == 0 ? (
        <p>Parece que nenhuma empresa de assistência foi cadastrado ainda!</p>
      ):(<></>)}
    </div>
  );
}
