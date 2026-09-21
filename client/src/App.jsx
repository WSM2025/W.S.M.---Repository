import { useState } from "react";
import reactLogo from "./assets/logo versao2_branca.png";
import "./login.css";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ useNavigate para redirecionar
import 'boxicons/css/boxicons.min.css';

function App() {
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // apenas trecho da função handleLogin do App.jsx (login funcionário)
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf: codigo, senha }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErro(data.error || "Credenciais inválidas");
      return;
    }
    const usuario = { codigo: data.codigo, nome: data.nome, nivel: data.nivel };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    // somente nível 1 pode acessar CRUD funcionário
    if (Number(data.nivel) === 1) navigate("/F_create");
    else navigate("/sem-acesso");
  } catch (err) {
    setErro("Erro de conexão");
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-top">
            <div className="login-card-logo">
              <img src={reactLogo} alt="logo" />
            </div>
            <div className="login-card-subtitle">Login Funcionário</div>
        </div>

        <div className="links-container">
          <div className="leave"><Link to="/login-produto"  style={{ textDecorationLine: 'none', color: 'inherit' }}>Estoque</Link></div>
          <div className="leave"><Link to="/"  style={{ textDecorationLine: 'none', color: 'inherit' }}>Funcionário</Link></div>
        </div>

        <br />

          <div className="login-card-header">
            <h1>Acesso ao CRUD de Funcionário</h1>
            <div>Insira seu código e senha</div>
          </div>

          <form  className="login-card-form" onSubmit={handleLogin}>
            <div className="form-item input-icon">
              <i class='bx bx-user-check'></i>
              <input
                type="number"
                placeholder="Digite seu código"
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
            
            <input className="button" type="submit" value="Entrar" />

            {erro && <p style={{ color: "red" }}>{erro}</p>}

          </form>
          <div className="login-card-footer">
            Se não tem acesso, contate o administrador.
          </div>
      </div>
    </div>
  );
}

export default App;
