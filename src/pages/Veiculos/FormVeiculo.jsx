import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../style/Form.css";

export default function FormVeiculo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    modelo: "",
    placa: "",
    grupoId: ""
  });
  const [grupoVeiculos, setGrupoVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const carregarGrupoVeiculo = async () => {
    setLoading(true);
    try {
      const res = await api.get("/GrupoVeiculo");
      setGrupoVeiculos(res.data);
    } catch (err) {
      console.error("Erro ao buscar grupo de veículos: ", err);
    } finally {
      setLoading(false);
    }
  };

  const carregarVeiculo = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/Veiculo/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error("Erro ao buscar veículo: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarGrupoVeiculo();
    if (id) {
      carregarVeiculo();
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/Veiculo/${id}`, form);
        alert("Veículo atualizado com sucesso!");
      } else {
        await api.post("/Veiculo", form);
        alert("Veículo criado com sucesso!");
      }
      navigate("/veiculos");
    } catch (err) {
      console.error("Erro ao salvar veículo:", err);
      alert("Erro ao salvar veículo.");
    }
  }

  return (
    <div>
      <h2>{id ? "Editar Veículo" : "Criar Novo Veículo"}</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Modelo:
            <input type="text" name="modelo" value={form.modelo} onChange={handleChange} required/>
          </label>

          <label>
            Placa:
            <input type="text" name="placa" value={form.placa} onChange={handleChange} required/>
          </label>
          
          <select name="grupoId" value={form.grupoId} onChange={handleChange}>
            {grupoVeiculos.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nome}
              </option>
            ))}
          </select>

          <div style={{ marginTop: 10 }}>
            <button type="submit">{id ? "Salvar alterações" : "Criar veículo"}</button>
            <button type="button" onClick={() => navigate("/veiculos")}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}