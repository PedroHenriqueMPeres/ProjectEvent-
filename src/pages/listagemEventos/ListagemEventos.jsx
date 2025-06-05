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
    const [tipoModal, setTipoModal] = useState(""); // "descricaoEvento" ou "comentarios"
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioId, setUsuarioId] = useState("e17d9eb9-1aba-4fa6-845f-4ad5181c9ffd")
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
            const resposta = await api.get("Eventos");
            const todosOsEventos = resposta.data;

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuarioId);
            const minhasPresencas = respostaPresenca.data;

            // Mapeia eventos e adiciona a informação de presença
            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
                return {
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                };
            });


            setListaEventos(eventosComPresencas);
            console.log("Eventos carregados:", eventosComPresencas);
            console.log(`Informacoes de todos os eventos:${todosOsEventos}`);
            console.log(`Informacoes de eventos com presenca:${minhasPresencas}`);
            console.log(`Informacoes de todos os eventos com presenca:${eventosComPresencas}`);


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
        filtrarEventos();
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
            if (presenca === true && idPresenca) {
                // Desmarcar presença
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
                Swal.fire("Removido", "Sua presença foi cancelada.", "info");
            } else if (presenca === false && idPresenca) {
                // Confirmar presença
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
                Swal.fire("Confirmado", "Sua presença foi confirmada.", "success");
            } else {
                // Criar nova presença
                await api.post("PresencasEventos", {
                    situacao: true,
                    idUsuario: usuarioId,
                    idEvento: idEvento,
                });
                Swal.fire("Confirmado", "Sua presença foi confirmada.", "success");
            }

            // Atualiza a lista
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

                    {/* <div className="listagem_eventos">
                        <select name="eventos" defaultValue="">
                            <option value="" disabled>Todos os Eventos</option>
                            {listaTipoEvento.map(tipo => (
                                <option key={tipo.idTipoEvento} value={tipo.idTipoEvento}>
                                    {tipo.tituloTipoEvento}
                                </option>
                            ))}
                        </select>
                    </div> */}

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
                />
            )}
        </>
    );
};

export default ListagemEventos;
