import "./Lista.css"
import Editar from "../../assets/img/lapis.png"
import Excluir from "../../assets/img/Lixo.png"
import vaector1 from "../../assets/img/Vector.png"
import check from "../checkbox/checkbox"
import Toggle from "../checkbox/checkbox"

const Lista =(props) => {
    return(
        <>
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr />
            <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                    <select name="" id="">
                        <option value="" disabled selected>Tipo Evento</option>
                        <option value="">Esportes</option>
                        <option value="">Digitação</option>
                        <option value="">Batata Palha</option>
                    </select>
            </div>
            
            <div className="tabela">
                <table>{/*TABELA/cabeçalho da tabela:*/}
                    <thead>
                        <tr className="table_cabecalho"> {/*tr => table row*/}
                            <th>{props.tipoEventoo}</th>{/*th => table head : cabeça da tabela*/}      {/*HEAD OF THE TABLE OTC ROMAN REIGNS!!🗣️🗣️🗣️🔥🔥🔥*/}
                            <th style={{display:props.visivel}} >Gênero</th>
                            <th>                                                                       </th>
                            <th>                                                                       </th>
                            <th>                                                                       </th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>    
                                
                    <tbody> {/*tbody => corpo da tabela*/}
                        <tr className="item_lista">
                            
                            <td data-cell="Nome">{props.TipoEveento}</td>
                            <td data-cell="Genero" style={{display:props.visivel}}>Ação</td>
                            <th>                                                                       </th>
                            <th>                                                                       </th>
                            <th>                                                                       </th>
                            <td data-cell="Editar"><img src={props.Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><Toggle/></td>
                            
                        </tr>
                        
                        <tr className="item_lista" style={{display:props.visivel}}> 
                            <td data-cell="Nome">Harry Potter e a pedra de crack</td>
                            <td data-cell="Genero" style={{display:props.visivel}}>Científico</td>
                            <th>                                                                       </th>
                            <th>                                                                       </th>
                            <th>                                                                       </th>
                            <td data-cell="Editar"><img src={props.Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><Toggle/></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </section>
        </>
    )
}
export default Lista;