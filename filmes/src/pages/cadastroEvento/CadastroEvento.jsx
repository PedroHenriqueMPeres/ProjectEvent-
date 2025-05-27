import { useState } from "react";
import api from "../../services/Services";


import Imagem from "../../assets/img/CadastroEvento.svg";
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";
import Swal from "sweetalert2";

const CadastroEvento = () => {
    const [evento, setEvento] = useState("");
    const [tipoEvento, setTipoEvento] = useState("");
    const [dataEvento, setDataEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [instituicao, setInstituicao] = useState("D878E58F-195C-455D-86B0-76F20CAC1FF9");
    const [listaTipoEvento, setlistaTipoEvento] = useState([]);
    const [listaEvento, setListaEvento] = useState([]);


    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("tiposEventos");
            setlistaTipoEvento(resposta.data);

        } catch (error) {
            console.log(error);
            
        }
    }

    async function cadastrarEvento(evt) {
            evt.preventDefault();
        if(evento.trim() != ""){
            try {
                await api.post("eventos", {nomeEvento: evento, idTipoEvento: tipoEvento, dataEvento: dataEvento, descricao: descricao, idInstituicao: instituicao
                })
                const resposta = await api.get("TiposEventos");
    
                setlistaTipoEvento(resposta.data)
            } catch (error) {
                console.log(error);
            }
        }
    }

    useState(() => {
        listarTipoEvento();
    }, []);

    return (
        <>
            <Header
                user="Administrador"
                botao_logar="none"
            />
            
                <Cadastro
                img_banner={Imagem}
                titulo_cadastro="Cadastro de Evento"
                nomes="Nome"
                funcCadastro={cadastrarEvento}
                valorInput={evento}
                setValorInput={setEvento}

                valorSelect={tipoEvento}
                setValorSelect={setTipoEvento}

                valorSelect2={instituicao}
                setValorSelect2={setInstituicao}

                valorDate={dataEvento}
                setValorDate={setDataEvento}

                valorText={descricao}
                setValorText={setDescricao}

                lista={listaTipoEvento}
                />

                <Lista
                    titulo_lista="Eventos"
                    titulo="Nome"
                />
            
            <Footer />
        </>
    )
}

export default CadastroEvento;