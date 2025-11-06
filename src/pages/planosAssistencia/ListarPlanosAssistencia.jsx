import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../style/Listar.css";

export default function ListarPlanoAssistencia() {
  const [planoAssistencia, setPlanoAssistencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const carregarPlanoAssistencia = async () => {
    setLoading(true);
    try {
      const res = await api.get("/PlanoAssistencia");
      setPlanoAssistencia(res.data);
    } catch (err) {
      console.error("Erro ao buscar planos de assistência:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPlanoAssistencia();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Tem certeza que deseja excluir esse plano de assistência?");
    if (!ok) return;

    try {
      await api.delete(`/PlanoAssistencia/${id}`);
      setPlanoAssistencia((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erro ao excluir plano de assistência:", err);
      alert("Falha ao excluir veículo.");
    }
  };

  if (loading) {
    return <p>Carregando planos de assistência...</p>;
  }

  return (
    <div>
      <div className="top-div">
        <h2>Plano de Assistência</h2>
        <button className="create-btn" onClick={() => navigate("/planosAssistencia/novo")}>
          Criar Novo Plano de Assistência
        </button>
      </div>
      {planoAssistencia.length === 0 ? (
        <p>Nenhum Plano de Assistência encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descricao</th>
              <th>Cobertura</th>
              <th>EmpresaID</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {planoAssistencia.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.descricao}</td>
                <td>{p.cobertura}</td>
                <td>{p.empresaId ?? "-"}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/planosAssistencia/editar/${p.id}`)}>
                    Editar
                  </button>{" "}
                  <button className="return-btn" onClick={() => handleDelete(p.id)}>
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