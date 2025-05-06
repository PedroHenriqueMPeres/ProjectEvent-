
import Botao from "../../components/botao/Botao"
import "./CadastroEvento.css"
import Header from "../../components/header/Header"
import img from "../../assets/img/imgcadastroevento.png"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"


const CadastroEvento = () => {
    return(
        <>
        <Header/>

        <Cadastro
        tituloCadastro = "Cadastro Eventos"
        campoPlaceholder = "Nome"
        NomeDoBotao = "Cadastrar"
        />
        <Lista/>
        <Footer/>
        
       </>  
    )   
}

export default CadastroEvento;