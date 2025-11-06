import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../style/Listar.css";

export default function ListarGrupoVeiculos(){
    const [grupoVeiculos, setGrupoVeiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const carregarGrupoVeiculos = async () => {
      setLoading(true);
      try{
        const res = await api.get("/GrupoVeiculo");
        setGrupoVeiculos(res.data);
      }catch(err){
        console.error("Erro ao buscar grupo de veículos:",err);
      }finally{
        setLoading(false);
      }
    };
    useEffect(() => {
      carregarGrupoVeiculos();
    },[]);

    const handleDelete = async (id) => {
      const ok = window.confirm("Tem certeza que deseja excluir esse grupo de veículos?");
      if(!ok) return;

      try{
        await api.delete(`/GrupoVeiculo/${id}`);
        setGrupoVeiculos((prev) => prev.filter((g) => g.id !== id));
      }catch(err){
        console.error("Erro ao excluir grupo de veículo:",err);
        alert("Falha ao excluir grupo de veículo");
      }
    };

    if(loading){
      return <p>Carregando grupo de veículos...</p>;
    }

    return(
      <div>
        <div className="top-div">
          <h2>Grupo Veículos</h2>
          <button className="create-btn" onClick={() => navigate("/grupoVeiculos/novo")}>
            Criar Novo Grupo de Veículos
          </button>
        </div>
      {grupoVeiculos.length === 0 ? (
        <p>Nenhum grupo veículo encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {grupoVeiculos.map((g) => (
              <tr key={g.id}>
                <td>{g.id}</td>
                <td>{g.nome}</td>
                <td>{g.descricao}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/grupoVeiculos/editar/${g.id}`)}>
                    Editar
                  </button>{" "}
                  <button className="return-btn" onClick={() => handleDelete(g.id)}>
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