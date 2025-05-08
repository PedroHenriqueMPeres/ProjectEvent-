import CadastroEvento from "../pages/cadastroEventos/CadastroEvento";
import Login from "../pages/login/Login";
import TipoEvento from "../../src/pages/cadastroTipoEvento/cadastroTipoEvento"
import CadastroUsuario from "../pages/cadastroUsuario/cadastroUsuario"
import ListaDeEventos from "../pages/Lista de Eventos/listaEventos"
import {BrowserRouter, Route, Routes} from "react-router-dom";
const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>
         <Route path="/Login" element={<Login/>}/>
         <Route path="/CadastroEvento" element={<CadastroEvento/>}/>
         <Route path="/CadastroTipoEvento" element={<TipoEvento/>}/>
         <Route path="/CadastroUsuario" element={<CadastroUsuario/>}/>
         <Route path="/ListaEventos" element={<ListaDeEventos/>}/>
            </Routes>
            </BrowserRouter>
    )
}
export default Rotas;