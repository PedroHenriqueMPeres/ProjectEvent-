import "./cadastroUsuario.css"
import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Imaggem from "../../assets/img/undraw_add_user_re_5oib 1.png"

const CadastroEvento = () => {
    return(
        <>
        <Header/>
        <Cadastro
        tituloCadastro = "Cadastro do Tipo de Usuario"
        visibilidade = "none"
        campoPlaceholder = "Titulo"
        NomeDoBotao = "Cadastrar"
        banner_img = {Imaggem}
        />
        <Lista
        tituloLista = "Lista de Tipo Usuario"
        visivel = "none"
        tipoEventoo = "Tipo"
        TipoEveento = "Tipo Usuario"
        />
        <Footer/>
        </>  
    )   
}

export default CadastroEvento;