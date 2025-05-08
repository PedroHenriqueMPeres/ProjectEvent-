import Rotas from "../../Routes/Routes"
import Logo from "../../assets/img/logo1.png"
import Botao from "../../components/botao/Botao"
import "./Login.css"


const Login = () => {
    return(
        
        <main className = "main_login">
            <div className = "banner"></div>
            <section className = "section_login">
                <img src={Logo} alt="Login Image"x />
                <form action="" className="form_login">
                    
                     <div className="campos_login">
                        <div className="campo_input">
                            <label htmlFor="">Email:</label>
                            <input type="email" name="email" placeholder="Digite seu e-Name" />
                        </div>

                        <div className="campo_input">
                            <label htmlFor="">Senha:</label>
                            <input type="password" name="senha" placeholder="Digite sua senha"/>
                        </div>
                    </div> 
                    <a href="https://www.youtube.com/">Esqueci minha senha</a>
                    
                </form> <Botao nomeDoBotao="Login"/>
            </section>
            
        </main>
       
    )
}

export default Login;