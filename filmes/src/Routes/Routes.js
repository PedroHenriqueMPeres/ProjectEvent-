const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>
         <Routes path="/Login" element={<Login/>}/>
         <Routes path="/CadastroEvento" element={<TipoEvento/>}/>
            </Routes>
            </BrowserRouter>
    )
}
export default Rotas;