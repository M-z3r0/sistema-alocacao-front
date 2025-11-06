import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../style/Listar.css";

export default function ListarEmpresaAssistencia(){
  const [empresaAssistencia, setEmpresaAssistencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const carregarEmpresas = async () =>{
    setLoading(true);
    try{
      const res = await api.get("/EmpresaAssistencia") ;
      setEmpresaAssistencia(res.data);
    }catch(err){
      console.error("Erro ao buscar empresas de assistência:",err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    carregarEmpresas();
  },[]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Tem certeza que deseja excluir essa empresa?");
    if(!ok) return;

    try{
      await api.delete(`/EmpresaAssistencia/${id}`);
      setEmpresaAssistencia((prev) => prev.filter((e) => e.id !== id));
    }catch(err){
      console.error("Erro ao excluir a empresa de assistência",err);
      alert("Falha ao excluir empresa de assistência");
    }
  };

  if(loading){
    return <p>Carregando empresas de assistência...</p>;
  }

  return(
    <div>
      <div className="top-div">
        <h2>Empresa de Assistência</h2>
        <button className="create-btn" onClick={() => navigate("/empresaAssistencia/novo")}>
          Criar Nova Empresa
        </button>
      </div>
    {empresaAssistencia.length === 0 ? (
      <p>Nenhuma empresa de assistência encontrada.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresaAssistencia.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.nome}</td>
              <td>{e.endereco}</td>
              <td>
                <button className="edit-btn" onClick={() => navigate(`/empresaAssistencia/editar/${e.id}`)}>
                  Editar
                </button>{" "}
                <button className="return-btn" onClick={() => handleDelete(e.id)}>
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