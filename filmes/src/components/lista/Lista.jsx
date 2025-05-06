import "./Lista.css"
import Editar from "../../assets/img/lapis.png"
import Excluir from "../../assets/img/Lixo.png"
const Lista =(props) => {
    return(
        <>
        <section className="layout_grid listagem">
            <h1>Lista dos filmes</h1>
            <hr />
            <div className="tabela">
                <table>{/*TABELA/cabeçalho da tabela:*/}
                    <thead>
                        <tr className="table_cabecalho"> {/*tr => table row*/}
                            <th>Nome</th>{/*th => table head : cabeça da tabela*/}      {/*HEAD OF THE TABLE OTC ROMAN REIGNS!!🗣️🗣️🗣️🔥🔥🔥*/}
                            <th style={{display:props.visivel}} >Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody> {/*tbody => corpo da tabela*/}
                        <tr className="item_lista">
                            <td data-cell="Nome">Velozes e Furiosos</td>
                            <td data-cell="Genero" style={{display:props.visivel}}>Ação</td>
                            <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo" /></td>
                        </tr>
                        
                        <tr className="item_lista">
                            <td data-cell="Nome">Harry Potter e a pedra de crack</td>
                            <td data-cell="Genero" style={{display:props.visivel}}>Científico</td>
                            <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo" /></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </section>
        </>
    )
}
export default Lista;