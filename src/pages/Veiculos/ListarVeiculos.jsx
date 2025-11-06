import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../style/Listar.css";

export default function ListarVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const carregarVeiculos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/Veiculo");
      setVeiculos(res.data);
    } catch (err) {
      console.error("Erro ao buscar veículos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Tem certeza que deseja excluir esse veículo?");
    if (!ok) return;

    try {
      await api.delete(`/Veiculo/${id}`);
      setVeiculos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Erro ao excluir veículo:", err);
      alert("Falha ao excluir veículo.");
    }
  };

  if (loading) {
    return <p>Carregando veículos...</p>;
  }

  return (
    <div>
      <div className="top-div">
        <h2>Veículos</h2>
        <button className="create-btn" onClick={() => navigate("/veiculos/novo")}>
          Criar Novo Veículo
        </button>
      </div>
      {veiculos.length === 0 ? (
        <p>Nenhum veículo encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>GrupoId</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.modelo}</td>
                <td>{v.placa}</td>
                <td>{v.grupoId}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/veiculos/editar/${v.id}`)}>
                    Editar
                  </button>{" "}
                  <button className="return-btn" onClick={() => handleDelete(v.id)}>
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