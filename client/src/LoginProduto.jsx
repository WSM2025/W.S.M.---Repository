// client/src/LoginProduto.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ useNavigate para redirecionar
import reactLogo from "./assets/logo versao2_branca.png";
import "./login.css";
import 'boxicons/css/boxicons.min.css';

function LoginProduto() {
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: codigo, senha }),
      });

      const dados = await res.json();

      if (!res.ok) {
        setErro(dados.error || "Credenciais inválidas");
        return;
      }

      // Espera-se que o backend retorne { codigo, nome, nivel }
      const usuario = {
        codigo: dados.codigo,
        nome: dados.nome,
        nivel: dados.nivel,
      };

      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redireciona de acordo com nível: para produtos nível <= 2
      const nivel = Number(usuario.nivel);
      if (nivel <= 2) {
        navigate("/dashboard");
      } else {
        // sem acesso a produtos
        navigate("/sem-acesso");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setErro("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-container">
        <div className="login-card">
          <div className="login-card-top">
            <div className="login-card-logo">
              <img src={reactLogo} alt="logo" />
            </div>
            <div className="login-card-subtitle">Login Estoque</div>
          </div>
          
          <div className="links-container">
            <div className="leave"><Link to="/login-produto"  style={{ textDecorationLine: 'none', color: 'inherit' }}>Estoque</Link></div>
            <div className="leave"><Link to="/"  style={{ textDecorationLine: 'none', color: 'inherit' }}>Funcionário</Link></div>
          </div>

          <br />
          
          <div className="login-card-header">
            <h1>Acesso ao CRUD do Estoque</h1>
            <div>Insira seu código e senha</div>
          </div>

          <form className="login-card-form" onSubmit={handleLogin}>
            <div className="form-item input-icon">
              <i class='bx bx-user-check'></i>
              <input
                type="number"
                placeholder="Digite seu código"
                name="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>

            <div className="form-item input-icon">
              <i className="bx bx-lock-alt"></i>
              <input
                type="password"
                placeholder="Senha"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            {erro && <div className="erro">{erro}</div>}

            <input className="button" type="submit" value="Entrar" />
          </form>
          <div className="login-card-footer">
            Se não tem acesso, contate o administrador.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginProduto;
