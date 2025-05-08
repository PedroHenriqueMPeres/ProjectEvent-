import "./cadastroTipoEvento.css"
import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Imaggem from "../../assets/img/banner01.png"

const CadastroEvento = () => {
    return(
        <>
        <Header/>
        <Cadastro
        tituloCadastro = "Cadastro do Tipo de Eventos"
        visibilidade = "none"
        campoPlaceholder = "DIgite o tipo de evento"
        NomeDoBotao = "Cadastrar"
        banner_img = {Imaggem}
        />
        <Lista
        tituloLista = "Lista"
        visivel = "none"
        tipoEventoo = "Tipo do Evento"
        TipoEveento = "Aventura"
        />
        <Footer/>
        </>  
    )   
}

export default CadastroEvento;