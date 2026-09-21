import { useEffect, useState } from 'react';
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import './dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api";

function FList() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  useEffect(() => {
    async function carregarFuncionarios() {
      try {
        const response = await api.get("/funcionarios");
        setFuncionarios(response.data);
      } catch (err) {
        console.error("Erro ao carregar funcionarios:", err);
      }
    }
    carregarFuncionarios();
  }, []);

  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
          <li><Link to="/F_create"><i className="bx bx-id-card"></i>Cadastrar Funcionário</Link></li>
          <li><Link to="/F_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li><Link to="/F_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
          <li className="active"><Link to="/F_list"><i className="bx bx-group"></i>Listar</Link></li>
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
              <h1>Lista de Funcionários</h1>
              <p>Consulte todos os funcionários cadastrados</p>
            </div>

            <div className="list-container">
              <fieldset className="list-result">
                {/*<h2>Funcionários</h2>*/}
                <table className="list-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nome</th>
                      <th>Endereço</th>
                      <th>Data de Nascimento</th>
                      <th>Senha</th>
                      <th>Nível de Acesso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funcionarios.length > 0 ? (
                      funcionarios.map((f) => (
                        <tr key={f.FUN_Codigo}>
                          <td>{f.FUN_Codigo}</td>
                          <td>{f.FUN_Nome}</td>
                          <td>{f.FUN_Endereco}</td>
                          <td>{f.FUN_DtNasc}</td>
                          <td>{f.FUN_Senha}</td>
                          <td>{f.FUN_Nivel}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">Nenhum funcionário cadastrado</td>
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

export default FList;
