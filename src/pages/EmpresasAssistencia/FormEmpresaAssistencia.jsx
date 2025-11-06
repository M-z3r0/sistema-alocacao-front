import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../style/Form.css";

export default function FormEmpresaAssistencia() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    endereco: ""
  });
  const [loading, setLoading] = useState(false);
  const carregarEmpresaAssistencia = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/EmpresaAssistencia/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error("Erro ao buscar empresa de assistência:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      carregarEmpresaAssistencia();
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/EmpresaAssistencia/${id}`, form);
        alert("Empresa atualizada com sucesso!");
      } else {
        await api.post("/EmpresaAssistencia", form);
        alert("Empresa criada com sucesso!");
      }
      navigate("/empresaAssistencia");
    } catch (err) {
      console.error("Erro ao salvar empresa:", err);
      alert("Erro ao salvar empresa.");
    }
  }

  return (
    <div>
      <h2>{id ? "Editar Empresa" : "Criar Nova Empresa"}</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
          <label>
            Nome:
            <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
          </label>
          <label>
            Endereço:
            <input type="text" name="endereco" value={form.endereco} onChange={handleChange} required />
          </label>

          <div style={{ marginTop: 10 }}>
            <button type="submit">{id ? "Salvar alterações" : "Criar Empresa"}</button>{" "}
            <button type="button" onClick={() => navigate("/empresaAssistencia")}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
