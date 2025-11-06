import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../style/Form.css";

export default function FormPlanoAssistencia() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    descricao: "",
    cobertura: "",
    empresaId: ""
  });
  const [empresaAssistencia, setEmpresaAssistencia] = useState([]);
  const [loading, setLoading] = useState(false);
  const carregarPlanoAssistencia = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/PlanoAssistencia/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error("Erro ao buscar plano de assistência:", err);
    } finally {
      setLoading(false);
    }
  }

  const carregarEmpresaAssistencia = async () =>{
    setLoading(true);
    try{
      const res = await api.get("/EmpresaAssistencia");
      setEmpresaAssistencia(res.data);
    }catch(err){
      console.error("Erro ao buscar empresa de assistência");
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarEmpresaAssistencia();
    if (id) {
      carregarPlanoAssistencia();
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/PlanoAssistencia/${id}`, form);
        alert("Plano atualizado com sucesso!");
      } else {
        await api.post("/PlanoAssistencia", form);
        alert("Plano criado com sucesso!");
      }
      navigate("/planosAssistencia");
    } catch (err) {
      console.error("Erro ao salvar plano:", err);
      alert("Erro ao salvar plano.");
    }
  }

  return (
    <div>
      <h2>{id ? "Editar Plano" : "Criar Novo Plano"}</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
          <label>
            Descrição:
            <input type="text" name="descricao" value={form.descricao} onChange={handleChange} required />
          </label>
          <label>
            Cobertura:
            <input type="text" name="cobertura" value={form.cobertura} onChange={handleChange} required />
          </label>
          <select name="empresaId" value={form.empresaId} onChange={handleChange}>
            {empresaAssistencia.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nome}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 10 }}>
            <button type="submit">{id ? "Salvar alterações" : "Criar plano"}</button>{" "}
            <button type="button" onClick={() => navigate("/planosAssistencia")}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
