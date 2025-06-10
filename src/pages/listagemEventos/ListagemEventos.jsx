import { useEffect, useState } from "react";
import api from "../../services/Services";
import Swal from "sweetalert2";

import "./ListagemEventos.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Modal from "../../components/modal/Modal";
import Toggle from "../../components/toggle/Toggle";

import Comentario from "../../assets/img/Comentario.svg";
import Informacao from "../../assets/img/Informacao.svg";

const ListagemEventos = () => {
    const [listaEventos, setListaEventos] = useState([]);
    const [listaTipoEvento, setListaTipoEvento] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioId, setUsuarioId] = useState("e17d9eb9-1aba-4fa6-845f-4ad5181c9ffd");
    const [filtroData, setFiltroData] = useState("todos");

    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter((evento) => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData === "todos") return true;
            if (filtroData === "futuros" && dataEvento > hoje) return true;
            if (filtroData === "passados" && dataEvento < hoje) return true;

            return false;
        });
    }

    async function listarEventos() {
        try {
            const respostaEventos = await api.get("Eventos");
            const todosOsEventos = respostaEventos.data;

            const respostaPresenca = await api.get(`PresencasEventos/ListarMinhas/${usuarioId}`);
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
                return {
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                };
            });

            setListaEventos(eventosComPresencas);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar tipos de eventos:", error);
        }
    }

    useEffect(() => {
        listarEventos();
        listarTipoEvento();
    }, []);

    function abrirModal(tipo, dados) {
        setTipoModal(tipo);
        setDadosModal(dados);
        setModalAberto(true);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca) {
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
                Swal.fire("Removido", "Sua presença foi cancelada.", "info");
            } else if (!presenca && idPresenca) {
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
                Swal.fire("Confirmado", "Sua presença foi confirmada.", "success");
            } else {
                await api.post("PresencasEventos", {
                    situacao: true,
                    idUsuario: usuarioId,
                    idEvento: idEvento,
                });
                Swal.fire("Confirmado", "Sua presença foi confirmada.", "success");
            }

            listarEventos();
        } catch (error) {
            console.error("Erro ao manipular presença:", error);
            Swal.fire("Erro", "Não foi possível atualizar sua presença.", "error");
        }
    }

    return (
        <>
            <Header user="Aluno" botao_logar="none" />
            <main>
                <section className="layout_grid listagem_section">
                    <div className="titulo_listagem">
                        <h1>Eventos</h1>
                        <hr />
                    </div>

                    <select onChange={(e) => setFiltroData(e.target.value)}>
                        <option value="todos">Todos os Eventos</option>
                        <option value="futuros">Somente futuros</option>
                        <option value="passados">Somente passados</option>
                    </select>

                    <div className="list">
                        <table>
                            <thead>
                                <tr className="list_tabela">
                                    <th>Título</th>
                                    <th>Data do Evento</th>
                                    <th>Tipo Evento</th>
                                    <th>Descrição</th>
                                    <th>Comentários</th>
                                    <th>Participar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaEventos.length > 0 ? (
                                    filtrarEventos().map((item) => (
                                        <tr key={item.idEvento} className="list_presenca">
                                            <td data-cell="Título">{item.nomeEvento}</td>
                                            <td data-cell="Data do Evento">{new Date(item.dataEvento).toLocaleDateString("pt-BR")}</td>
                                            <td data-cell="Tipo Evento">{item.tiposEvento?.tituloTipoEvento}</td>
                                            <td data-cell="Descrição">
                                                <img
                                                    src={Informacao}
                                                    alt="Descrição"
                                                    onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </td>
                                            <td data-cell="Comentários">
                                                <img
                                                    src={Comentario}
                                                    alt="Comentário"
                                                    onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </td>
                                            <td data-cell="Presença">
                                                <Toggle
                                                    presenca={item.possuiPresenca}
                                                    manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Nenhum evento encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <Footer visibilidade="none" visibilidadeIcon="none" />

            {modalAberto && (
                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descrição do Evento" : "Comentário"}
                    tipoModel={tipoModal}
                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}
                    fecharModal={fecharModal}
                    modalAberto={modalAberto}
                />
            )}
        </>
    );
};

export default ListagemEventos;