import "./Header.css";
import Logo from "../../assets/img/logo1.png"
import React from "react";
import Vector from "../../assets/img/Vector.png"

const Header = () => {
    return(
        <header>
            <div className="layout_grid cabecalho">
            
            
            <img className="logoHeader" src={Logo} alt="logozinha" />

            <nav className="nav_header">
                <div className="NavMenu">
                <a href="">Home</a> 
                <a href="">Eventos</a>
                <a href="">Usuários</a>
                <a href="">Contatos</a>
                </div>
            </nav> 
            
            <a className="Adm" href="">Administrador<img src={Vector} alt="fg" /></a>
                
            </div>
            {/* mo rolê pra esse negocio vei, seloko*/}
        </header>
    )
}
export default Header;