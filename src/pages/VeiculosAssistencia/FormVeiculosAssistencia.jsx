import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../style/Form.css";

export default function FormVeiculoAssistencia(){
  const navigate = useNavigate();
  const {id} = useParams();
  const [planoAssistencia, setPlanoAssistencia] = useState([]);
  const [veiculo, setVeiculos] = useState([]);
  const [form, setForm] = useState({
    veiculoId: "",
    planoId: ""
  });
  const [loading, setLoading] = useState(false);
    const carregarVeiculosAssistencia = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/VeiculoAssistencia/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error("Erro ao buscar veículos com planos associados", err);
    } finally {
      setLoading(false);
    }
  };

  const carregarVeiculos = async () => {
    try {
      const res = await api.get("/Veiculo");
      setVeiculos(res.data);
    } catch (err) {
      console.error("Erro ao buscar grupos de veículos:", err);
    }
  };
  const carregarPlanos = async () => {
    try {
      const res = await api.get("/PlanoAssistencia");
      setPlanoAssistencia(res.data);
    } catch (err) {
      console.error("Erro ao buscar empresas de assistência:", err);
    }
  };

  useEffect(()=>{
    carregarPlanos();
    carregarVeiculos();
    if(id){
      carregarVeiculosAssistencia();
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      if(id){
        await api.put(`/VeiculoAssistencia/${id}`,form);
        alert("Associação de veículo e plano atualizada com sucesso!");
      }else{
        await api.post("/VeiculoAssistencia", form);
        alert("Associação de veículo e plano criada com sucesso");
      }
      navigate("/veiculosAssistencia");
    }catch (err){
      console.error("Erro ao salvar associação: ",err);
      alert("Erro ao salvar associação");
    }
  }
  return (
    <div>
      <h2>{id ? "Editar Associação" : "Criar Nova Associação"}</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
          <label>
            Veículo:
          </label>
          <select name="veiculoId" value={form.veiculoId} onChange={handleChange}>
            {veiculo.map((v) => (
              <option key={v.id} value={v.id}>
                {v.modelo}
              </option>
            ))}
          </select>
          <label>
            ID do plano:
          </label>
          <select name="planoId" value={form.planoId} onChange={handleChange}>
            {planoAssistencia.map((p) => (
              <option key={p.id} value={p.id}>
                {p.descricao}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 10 }}>
            <button type="submit">{id ? "Salvar alterações" : "Associar veículo"}</button>{" "}
            <button type="button" onClick={() => navigate("/veiculosAssistencia")}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
