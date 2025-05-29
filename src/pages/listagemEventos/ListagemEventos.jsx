import "./ListagemEventos.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Comentario from "../../assets/img/Comentario.svg"
import Toggle from "../../components/toggle/Toggle";
import Lista from "../../components/lista/Lista";
import api from "../../services/Services";
import { useState, useEffect } from "react";

const ListagemEventos = () => {

    const [listaEvento, setListaEvento] = useState([]);
    const [listaTipoEvento, setlistaTipoEvento] = useState([]);
    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos");

            setlistaTipoEvento(resposta.data)
        } catch (error) {
            console.log(error);
        }
    }
    async function listarEvento() {
        try {
            const resposta = await api.get("Eventos");

            setListaEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarEvento();
        listarTipoEvento();
    }, [listaEvento]);
    return (

        <>
            <Header
                user="Aluno"
                botao_logar="none"
            />
            <main>
                <section className="layout_grid listagem_section">
                    <div className="titulo_listagem">
                        <h1>Eventos</h1>
                        <hr />
                    </div>

                    <div className="listagem_eventos">
                        <select name="eventos" id="">
                            <option value="" disabled selected>Todos os Eventos</option>
                        </select>
                    </div>
                </section>
                <Lista
                    titulo="Nome"
                    visibilidadeE="none"
                    visibilidadeEE="none"
                    lista={listaEvento}
                    
                />
            </main>

            <Footer
                visibilidade="none"
                visibilidadeIcon= "none"
            />
        </>
    )
}

export default ListagemEventos;