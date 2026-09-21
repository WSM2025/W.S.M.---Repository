import { useState } from 'react';
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import './dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api";

function FRead() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState([]);

  // 🔹 Função de logout
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  // 🔹 Função que busca funcionários no backend
  const buscarFuncionarios = async (e) => {
    e.preventDefault();

    if (!busca.trim()) {
      alert("Digite o nome ou o código do funcionário que deseja buscar.");
      return;
    }

    try {
      const response = await api.get(`/funcionarios/buscar?termo=${busca}`);
      setResultado(response.data);
    } catch (err) {
      console.error("Erro ao buscar funcionário:", err);
      alert("Erro ao buscar funcionário.");
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
          <li><Link to="/F_create"><i className="bx bx-id-card"></i>Cadastrar Funcionário</Link></li>
          <li className="active"><Link to="/F_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li><Link to="/F_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
          <li><Link to="/F_list"><i className="bx bx-group"></i>Listar</Link></li>
          <li><Link to="/F_delete"><i className="bx bx-trash"></i>Deletar</Link></li>
          <li><Link to="/F_client"><i className="bx bx-user-plus"></i>Cadastrar Cliente</Link></li>
          <li><Link to="/F_supplier"><i className="bx bxs-factory"></i>Cadastrar Fornecedor</Link></li>
        </ul>

        <ul className="side-menu">
          <li>
            <button
              onClick={handleLogout}
              className="logout"
              style={{
                background: "none",
                border: "none",
                color: "red",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize: "16px",
                padding: "8px 16px",
              }}
            >
              <i className="bx bx-log-out-circle"></i>
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="content">
        <nav>
          <img src={reactLogo} alt="logo" />
          <img className="logo-cliente" src={reactclient} alt="logo" />
          <h2>Service Facility</h2>
        </nav>

        <main>
          <div className="cabecalho-wrapper">
            <div className="cabecalho-header">
              <h1>Busca de Funcionários</h1>
              <p>Consulte os funcionários cadastrados</p>
            </div>

            <div className="list-container">
              {/* 🔹 Campo de busca */}
              <form onSubmit={buscarFuncionarios} className="list-form">
                <input
                  type="search"
                  placeholder="Buscar funcionário por nome ou código..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <button type="submit">Buscar</button>
              </form>

              {/* 🔹 Resultado da busca */}
              <fieldset className="list-result">
                {/*<h2>Resultado da Busca</h2>*/}
                <table className="list-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nome</th>
                      <th>Data de Nascimento</th>
                      <th>Endereço</th>
                      <th>Nível</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.length > 0 ? (
                      resultado.map((f) => (
                        <tr key={f.FUN_Codigo}>
                          <td>{f.FUN_Codigo}</td>
                          <td>{f.FUN_Nome}</td>
                          <td>{new Date(f.FUN_DtNasc).toLocaleDateString('pt-BR')}</td>
                          <td>{f.FUN_Endereco}</td>
                          <td>{f.FUN_Nivel}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" align="center">Nenhum funcionário encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </fieldset>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default FRead;
