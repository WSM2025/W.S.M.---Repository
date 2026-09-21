import { useState } from "react";
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api";

function FDelete() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  const buscarFuncionarios = async (e) => {
    e.preventDefault();

    if (!busca.trim()) {
      alert("Digite o código ou o nome do funcionário que deseja buscar.");
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

  const deletarFuncionario = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja deletar este funcionário?");
    if (!confirmar) return;

    try {
      await api.delete(`/funcionarios/${id}`);
      alert("Funcionário deletado com sucesso!");
      setResultado(resultado.filter((f) => f.FUN_Codigo !== id));
    } catch (err) {
      console.error("Erro ao deletar funcionário:", err);
      alert("Erro ao deletar funcionário.");
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
          <li><Link to="/F_create"><i className="bx bx-id-card"></i>Cadastrar Funcionário</Link></li>
          <li><Link to="/F_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li><Link to="/F_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
          <li><Link to="/F_list"><i className="bx bx-group"></i>Listar</Link></li>
          <li className="active"><Link to="/F_delete"><i className="bx bx-trash"></i>Deletar</Link></li>
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
              <h1>Exclusão de Funcionários</h1>
              <p>Digite o código ou nome do funcionário que deseja excluir</p>
            </div>

            <div className="delete-container">
              {/* Etapa 1: Formulário de busca */}
              {resultado.length === 0 && (
                <form onSubmit={buscarFuncionarios} className="delete-form">
                  <div className="form-input">
                    <input
                      type="search"
                      placeholder="Buscar funcionário por código ou nome..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                    <button className="search-btn" type="submit">Buscar</button>
                  </div>
                </form>
              )}

              {/* Etapa 2: Exibição dos dados */}
              {resultado.length > 0 && (
                <fieldset className="delete-confirm">
                  <h2>Funcionário Encontrado</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Data de Nascimento</th>
                        <th>Nível</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.map((f) => (
                        <tr key={f.FUN_Codigo}>
                          <td>{f.FUN_Codigo}</td>
                          <td>{f.FUN_Nome}</td>
                          <td>{f.FUN_Endereco}</td>
                          <td>{f.FUN_DtNasc ? f.FUN_DtNasc.slice(0, 10) : "—"}</td>
                          <td>{f.FUN_Nivel}</td>
                          <td>
                            <button
                              className="delete-btn"
                              onClick={() => deletarFuncionario(f.FUN_Codigo)}
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </fieldset>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default FDelete;
