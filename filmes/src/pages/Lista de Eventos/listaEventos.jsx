import "./listaEventos.css"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import comentt from "../../assets/img/coment.png"
import Toggle from "../../components/checkbox/checkbox"


const listaEvento = () => {
    return(
        <>
        <Header/>
        <Lista 
        tituloLista= "Lista Eventos"
        TipoEveento= "Harry Poti e o briefing do trampo 24por0"
        tipoEventoo= "Nome"
        Editar= {comentt}
        Excluir= {Toggle}
        />
        <Footer/>
       </>  
    )   
}

export default listaEvento;