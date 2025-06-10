import { useState } from "react";
import Logo from "../../assets/img/Logo.svg";
import Botao from "../../components/botao/Botao";
import api from "../../services/Services";
import "./Login.css";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    async function realizarAutenticacao(e) {
        e.preventDefault();

        const usuario = {
            email: email,
            senha: senha
        };

        if (senha.trim() != "" || email.trim() != "") {
            try {
                const resposta = await api.post("Login", usuario);

                const token = resposta.data.token;

                if (token) {
                    userDecodeToken(token);
                    const tokenDecodificado = userDecodeToken(token);

                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));
                    if (tokenDecodificado.tipoUsuario === "aluno") {
                        
                        navigate("/Listagem")

                    }else{
                        navigate("/Evento")
                    }

                }

                // Aqui você pode redirecionar ou salvar o token, etc.
                console.log(resposta.data.token);

            } catch (error) {
                console.log(error);
                alert("email ou senha invalido !!Entre em contato com o suport!! ")
            }
        } else {
            console.log("Algo esta errado");
        }
    }

    return (
        <main className="main_login">
            <div className="banner">
                <div id="fundo_login" />
            </div>

            <section className="section_login">
                <img src={Logo} alt="Logo do Event" />

                <form className="form_login" onSubmit={realizarAutenticacao}>
                    <div className="campos_login">
                        <div className="campo_input">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="campo_input">
                            <input
                                type="password"
                                name="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    </div>

                    <a href="#">Esqueceu sua senha?</a>
                    <Botao botao="Login" />
                </form>
            </section>
        </main>
    );
};

export default Login;
