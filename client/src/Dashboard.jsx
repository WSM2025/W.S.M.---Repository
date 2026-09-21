import { useState, useEffect } from "react";
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import api from "./services/api"; // conexão com backend
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [alertasEstoque, setAlertasEstoque] = useState([]);

  const usuarioRaw = JSON.parse(localStorage.getItem("usuario")) || {
    nome: "Usuário",
    codigo: "0000",
    nivel: 99,
  };

  const usuario = {
    ...usuarioRaw,
    nivel: Number(usuarioRaw.nivel),
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  useEffect(() => {
    axios.get("http://localhost:3000/alertas-estoque")
      .then((res) => setAlertasEstoque(res.data))
      .catch((err) => console.error("Erro ao buscar alertas:", err));
  }, []);

  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
        <li className="active"><Link to="/dashboard"><i className="bx bx-home"></i>Dashboard</Link></li>
          <li><Link to="/P_create"><i className="bx bx-box"></i>Cadastrar Produto</Link></li>
          <li><Link to="/P_list"><i className="bx bx-receipt"></i>Estoque</Link></li>
          <li><Link to="/P_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li><Link to="/P_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
          <li><Link to="/P_baixa"><i className="bx bx-down-arrow-alt"></i>Dar Baixa</Link></li>
          <li><Link to="/P_delete"><i className="bx bx-trash"></i>Deletar</Link></li>  
        </ul>

        <ul className="side-menu">
          <li>
            {/* 🔹 Botão de Logout funcional */}
            <button onClick={handleLogout} className="logout" style={{
              background: "none",
              border: "none",
              color: "red",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              padding: "8px 16px",
            }}>
              <i className="bx bx-log-out-circle"></i>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="content">
        <nav>
          <img src={reactLogo} alt="logo" />
          <img className="logo-cliente" src={reactclient} alt="logo" />
          <h2>Service Facility</h2>
        </nav>

        <main>
          {/* PAINEL DE INFORMAÇÕES */}
<div className="info-panel">
  <div className="info-header">
    <h2>Informações do Funcionário</h2>
  </div>
  <div className="info-body">
    <div className="info-block">
      <p><strong>ID:</strong> {usuario.codigo}</p>
      <p><strong>Nome:</strong> {usuario.nome}</p>
    </div>
    <div className="divider"></div>
    <div className="info-block">
      <p><strong>Nível:</strong> {usuario.nivel === 1 ? "Administrador" : "Funcionário"}</p>
      <p><strong>Empresa:</strong> Service Facility</p>
      {/*<p><strong>Data de Nascimento:</strong> {usuario.nascimento || "Não informado"}</p>*/}
    </div>
  </div>
</div>


          {/* PAINEL DE ALERTAS COM CARD DE FUNDO */}
          <section className="alert-section">
            <div className="alert-card-wrapper">
              <h2>🔔 Alertas (Menos de 10 unidades)</h2>
              <div className="alert-table">
                <div className="alert-row header">
                  <span>Estoque</span>
                  <span>Categoria</span>
                  <span>Data</span>
                </div>
                {alertasEstoque.map((alerta, index) => (
                  <div
                    key={index}
                    className={`alert-row ${alerta.tipo === "Baixo" ? "low" : "empty"}`}
                  >
                    <span>{alerta.tipo === "Baixo" ? "Baixo" : "Esgotado"}</span>
                    <span style={{ marginRight: "16px" }}>{alerta.categoria}</span>
                    <span>{alerta.data}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
