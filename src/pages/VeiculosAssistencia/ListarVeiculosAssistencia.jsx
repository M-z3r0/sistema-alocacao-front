import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../style/Listar.css";

export default function ListarVeiculosAssistencia() {
  const [veiculosAssistencia, setVeiculosAssistencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const carregarVeiculosAssistencia = async () => {
    setLoading(true);
    try {
      const res = await api.get("/VeiculoAssistencia");
      if (res.data && res.data.length === 0) {
        setVeiculosAssistencia([]);
      } else {
        setVeiculosAssistencia(res.data);
      }
    } catch (err) {
      console.error("Erro ao buscar os veículos com plano de assistência", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVeiculosAssistencia();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Tem certeza que deseja desassociar esse veículo à esse plano?");
    if (!ok) return;

    try {
      await api.delete(`/VeiculoAssistencia/${id}`);
      setVeiculosAssistencia((prev) => prev.filter((va) => va.veiculoAssistenciaId !== id));
    } catch (err) {
      console.error("Erro ao desassociar o veículo ao seu plano de assistência", err);
      alert("Falha ao desassociar o veículo ao seu plano de assistência");
    }
  };

  if (loading) {
    return <p>Carregando os veículos associados à planos de assistência...</p>;
  }

  return (
    <div>
      <div className="top-div">
        <h2>Veículos associados à planos de assistência</h2>
        <button className="create-btn" onClick={() => navigate("/veiculosAssistencia/novo")}>
          Associar Veículo
        </button>
      </div>
      {veiculosAssistencia.length === 0 ? (
        <p>Nenhum veículo associado à um plano encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID do Veículo</th>
              <th>Modelo do veículo</th>
              <th>ID do Plano</th>
              <th>Descrição do plano</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculosAssistencia.map((va) => (
              <tr key={va.veiculoAssistenciaId}>
                <td>{va.veiculoAssistenciaId}</td>
                <td>{va.veiculoId}</td>
                <td>{va.modeloVeiculo}</td>
                <td>{va.planoId}</td>
                <td>{va.planoDesc}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/veiculosAssistencia/editar/${va.veiculoAssistenciaId}`)}>
                    Editar
                  </button>{" "}
                  <button className="return-btn" onClick={() => handleDelete(va.veiculoAssistenciaId)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
