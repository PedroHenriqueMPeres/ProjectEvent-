import React, { useEffect, useState } from 'react';
import ImgDeletar from "../../assets/img/Excluir.svg"
import api from "../../services/Services";
import "./Modal.css"

const Modal = (props) => {
    const [comentarios, setComentarios] = useState([]);
    const [usuarioId, setUsuarioId] = useState("e17d9eb9-1aba-4fa6-845f-4ad5181c9ffd");
    const [novoComentario, setNovoComentario] = useState("");


    async function listarComentarios() {
        try {
            const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);

            setComentarios(resposta.data);

            console.log(resposta);
            
        } catch (error) {
            console.log(error);
        }
    }

    async function cadastrarComentario(comentario) {
        try {
            await api.post("ComentariosEventos",{
                idUsuario: usuarioId , 
                idEvento: props.idEvento,
                Descricao: comentario
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    async function deletarComentario(idComentario) {
        try {
            await api.delete(`ComentariosEventos/${idComentario}`);
        } catch (error) {
         console.log(error);
            
        }
    }

    useEffect(() => {
        listarComentarios();
    }, [])

    return (
        <>
            <div className="model-overlay" onClick={props.fecharModal}></div>
            <div className="model">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo">
                    {props.tipoModel === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentario}>
                                    <strong>{item.usuario.nomeUsuario}</strong>

                                    <img
                                        src={ImgDeletar}
                                        alt="Deletar"
                                    />

                                    <p>{item.descricao}</p> 
                                    <hr />
                                </div>
                            ))}
                            {/* onClick={() => deletarComentario(item.idComentario)} Esse onclick é de deletar comentario*/}
                            <div>
                                <input 
                                type="text" 
                                placeholder="Escreva seu comentário..."
                                value={novoComentario}
                                onChange={(e) => setNovoComentario(e.target.value)} />
                                <button className="botao" onClick={() => cadastrarComentario(novoComentario)}>
                                    cadastrar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </>
    )
}

export default Modal