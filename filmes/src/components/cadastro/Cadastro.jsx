import "./Cadastro.css"
import Botao from "../botao/Botao";
import Imagem from "../../assets/img/imgcadastroevento.png"

const Cadastro = (props) => {
    return (
        <section className="layout_grid section_cadastro">
            <div className="cadastro_titulo">
                <h1>{props.tituloCadastro}</h1>
                <hr />
            </div>

            <form action="" className="form_cadastro">

                <div className="img_cadastro">
                    <img src={Imagem} alt="Imagem do Cadastro" />
                </div>

                <div className="campos_cadastro">
                    <div className="campo_cad_nome">
                        <input type="text" placeholder={props.campoPlaceholder} />
                    </div>

                    <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                        <select name="" id="">
                            <option value="" disabled selected>Tipo Evento</option>
                            <option value="">Esportes</option>
                            <option value="">Digitação</option>
                            <option value="">Batata Palha</option>
                        </select>
                    </div>
                    <Botao nomeDoBotao={props.NomeDoBotao} />
                </div>
            </form>
        </section>
    )
}

export default Cadastro;