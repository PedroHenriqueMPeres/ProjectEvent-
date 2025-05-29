import { useEffect, useState } from "react";
import api from "../../services/Services";

import Imagem from "../../assets/img/CadastroEvento.svg"
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";
import Swal from "sweetalert2";

const CadastroEvento = () => {
    const [listaEvento, setListaEvento] = useState([]);
    const [listaTipoEvento, setlistaTipoEvento] = useState([]);
    const [instituicoes, setInstituicoes] = useState("D878E58F-195C-455D-86B0-76F20CAC1FF9");
    const [tipoEvento, setTipoEvento] = useState("");
    const [dateEvento, setDateEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [evento, setEvento] = useState("");

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
            const resposta = await api.get("TiposEventos");

            setlistaTipoEvento(resposta.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function cadastrarEvento(e) {
        e.preventDefault();
        // console.log(evento);
        // console.log(dateEvento);
        // console.log(descricao);
        // console.log(tipoEvento);        
        if (evento.trim() != "") {
            try {

                const resposta = await api.post("Eventos",
                    {
                        dataEvento: dateEvento,
                        nomeEvento: evento,
                        descricao: descricao,
                        idTipoEvento: tipoEvento,
                        idInstituicao: instituicoes
                    });
                //      
                console.log(resposta);

                // await api.post("Eventos",
                //     { nomeEvento: evento, idTipoEvento: tipoEvento, 
                //         dataEvento: dateEvento, descricao: descricao, 
                //         idInstituicao: instituicoes });
                // alertar("success", "Cadastro realizado com sucesso!");
                // setEvento("");
                // setDateEvento();
                // setDescricao("");
                // setTipoEvento("");



            } catch (error) {
                alertar("error", "Entre em contato com o suporte")
                console.log(error);

            }
        } else {
            alertar("error", "Preencha o campo vazio")

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

    async function deletarEvento(id) {
        Swal.fire({
            title: 'Tem Certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`eventos/${id.idEvento}`);
                alertar("success", "Evento Excluido!");
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        })
    }

    async function editarEvento(eventos) {
        const { value: novoEvento } = await Swal.fire({
            title: "Modifique seu Tipo Evento",
            input: "text",
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            inputLabel: "Novo Evento",
            inputValue: eventos.nomeEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoEvento) {
            try {
                await api.put(`eventos/${eventos.idEvento}`,
                    { NomeEvento: novoEvento });
                alertar("success", "Evento Modificado!")
            } catch (error) {
                console.log(error);
            }
            Swal.fire(`Seu novo Tipo Evento: ${novoEvento}`);
        }
    }

    useEffect(() => {

        listarTipoEvento();
    }, [listaEvento]);


    useEffect(() => {
        listarEvento();
        console.log(evento);
        

    }, []);

    return (
        <>
            <Header
                user="Administrador"
                botao_logar="none"
            />
            <main>
                <Cadastro
                    titulo_cadastro="Cadastro de Eventos"
                    campo_placeholder="Nome"
                    campo_descricao="Descrição"
                    botao="Cadastrar"
                    banner_img={Imagem}

                    //Cadastrar evento
                    funcCadastro={cadastrarEvento}

                    valorInput={evento}
                    setValorInput={setEvento}

                    // Obter data
                    valorData={dateEvento}
                    setValorData={setDateEvento}

                    //Obter descricao 
                    valorInputDescricao={descricao}
                    setValorInputDescricao={setDescricao}

                    // Obter TipoEvento 
                    valorTpEvento={tipoEvento}
                    setValorTpEvento={setTipoEvento}

                    // Obter Instituições
                    valorInstituicao={instituicoes}
                    setValorInstituicao={setInstituicoes}

                    // Listar TipoEvento
                    lista={listaTipoEvento}
                />

                <Lista
                    titulo_lista="Eventos"
                    titulo="Nome"

                    tipoLista="Eventos"
                    lista={listaEvento}

                    funcDeletar={deletarEvento}
                    funcEditar={editarEvento}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroEvento;