import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../style/Form.css";

export default function FormGrupoVeiculo() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [form, setForm] = useState({
        nome: "",
        descricao : ""
    });
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(id){
            carregarGrupoVeiculo();
        }
    }, [id]);
    const carregarGrupoVeiculo = async ()=>{
        setLoading(true);
        try{
            const res = await api.get(`/GrupoVeiculo/${id}`);
            setForm(res.data);
        }catch(err){
            console.error("Erro ao buscar grupo de veículos:",err);
        }finally{
            setLoading(false);
        }
    }

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            if(id){
                await api.put(`/GrupoVeiculo/${id}`,form);
                alert("Grupo Veículo atualizado com sucesso!");
            }else{
                await api.post("/GrupoVeiculo",form);
                alert("Grupo Veículo criado com sucesso!");
            }
            navigate("/grupoVeiculos");
        }catch(err){
            console.error("Erro ao salvar grupo veículo:",err);
            alert("Erro ao salvar grupo veículo.");
        }
    }

    return(
        <div>
            <h2>{id ? "Editar Grupo Veículo" : "Criar Novo Grupo Veículo"}</h2>
            {loading ? (<p>Carregando...</p>) : 
            (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
                    <label>
                        Nome:
                        <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
                    </label>
                     <label>
                        Descrição:
                        <input type="text" name="descricao" value={form.descricao} onChange={handleChange} required />
                    </label>
                    <div style={{ marginTop: 10 }}>
                        <button type="submit">{id ? "Salvar alterações" : "Criar grupo veículo"}</button>{" "}
                        <button type="button" onClick={() => navigate("/grupoVeiculos")}>Cancelar</button>
                    </div>
                </form>
            )}
        </div>
    );
}