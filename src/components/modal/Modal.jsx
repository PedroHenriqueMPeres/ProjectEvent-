import React, { useEffect, useState } from 'react';
import ImgDeletar from "../../assets/img/Excluir.svg";
import api from "../../services/Services";
import "./Modal.css";

const Modal = (props) => {
    const { titulo, tipoModel, idEvento, descricao, fecharModal, modalAberto } = props;

    const [comentarios, setComentarios] = useState([]);
    const [usuarioId, setUsuarioId] = useState("e17d9eb9-1aba-4fa6-845f-4ad5181c9ffd");
    const [novoComentario, setNovoComentario] = useState("");

    async function listarComentarios() {
        if (!idEvento) {
            console.warn("Cannot list comments: idEvento is missing.");
            return;
        }
        try {
            const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${idEvento}`);
            setComentarios(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
        }
    }

    async function cadastrarComentario(comentario) {
        if (!comentario.trim()) {
            return;
        }
        if (!idEvento) {
            console.error("Cannot post comment: idEvento is missing.");
            return;
        }
        try {
            await api.post("ComentariosEventos", {
                idUsuario: usuarioId,
                idEvento: idEvento,
                descricao: comentario
            });
            setNovoComentario("");
            listarComentarios();
        } catch (error) {
            console.error("Erro ao cadastrar comentário:", error);
        }
    }

    async function deletarComentario(idComentario) {
        try {
            await api.delete(`ComentariosEventos/${idComentario}`);
            listarComentarios();
        } catch (error) {
            console.error("Erro ao deletar comentário:", error);
        }
    }

    useEffect(() => {
        if (modalAberto && tipoModel === "comentarios") {
            listarComentarios();
        } else {
            setComentarios([]);
        }
    }, [modalAberto, tipoModel, idEvento]);

    return (
        <>
            <div className="model-overlay" onClick={fecharModal}></div>
            <div className="model">
                <h1>{titulo}</h1>
                <div className="model_conteudo">
                    {tipoModel === "descricaoEvento" ? (
                        <p>{descricao}</p>
                    ) : (
                        <>
                            <div className="comments-list">
                                {comentarios.length > 0 ? (
                                    comentarios.map((item) => (
                                        <div key={item.idComentario} className="comment-item">
                                            <strong>{item.usuario.nomeUsuario}</strong>
                                            {item.idUsuario === usuarioId && (
                                                <img
                                                    src={ImgDeletar}
                                                    alt="Deletar"
                                                    onClick={() => deletarComentario(item.idComentario)}
                                                    style={{ cursor: "pointer", marginLeft: "10px" }}
                                                />
                                            )}
                                            <p>{item.descricao}</p>
                                            <hr />
                                        </div>
                                    ))
                                ) : (
                                    <p>Nenhum comentário para este evento.</p>
                                )}
                            </div>
                            <div className="add-comment-section">
                                <input
                                    type="text"
                                    placeholder="Escreva seu comentário..."
                                    value={novoComentario}
                                    onChange={(e) => setNovoComentario(e.target.value)}
                                />
                                <button className="botao" onClick={() => cadastrarComentario(novoComentario)}>
                                    Publicar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;