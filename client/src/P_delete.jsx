import { useState } from 'react';
import reactLogo from './assets/logo principal_branca.png';
import reactclient from "./assets/client.jpg";
import './dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api";

function PDelete() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  const buscarProdutos = async (e) => {
    e.preventDefault();

    if (!busca.trim()) {
      alert("Digite o ID ou a descrição do produto que deseja buscar.");
      return;
    }

    try {
      const response = await api.get(`/produtos/buscar?termo=${busca}`);
      setResultado(response.data);
    } catch (err) {
      console.error("Erro ao buscar produto:", err);
      alert("Erro ao buscar produto.");
    }
  };

  const deletarProduto = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja deletar este produto?");
    if (!confirmar) return;

    try {
      await api.delete(`/produtos/${id}`);
      alert("Produto deletado com sucesso!");
      setResultado(resultado.filter((p) => p.PRO_ID !== id));
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      alert("Erro ao deletar produto.");
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
          <li><Link to="/dashboard"><i className="bx bx-home"></i>Dashboard</Link></li>
          <li><Link to="/P_create"><i className="bx bx-box"></i>Cadastrar Produto</Link></li>
          <li><Link to="/P_list"><i className="bx bx-receipt"></i>Estoque</Link></li>
          <li><Link to="/P_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li><Link to="/P_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
          <li><Link to="/P_baixa"><i className="bx bx-down-arrow-alt"></i>Dar Baixa</Link></li>
          <li className="active"><Link to="/P_delete"><i className="bx bx-trash"></i>Deletar</Link></li>
        </ul>
        <ul className="side-menu">
          <li>
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

      <div className="content">
        <nav>
          <img src={reactLogo} alt="logo" />
          <img className="logo-cliente" src={reactclient} alt="logo" />
          <h2>Service Facility</h2>
        </nav>

        <main>
          <div className="cabecalho-wrapper">
            <div className="cabecalho-header">
              <h1>Exclusão de Peças</h1>
              <p>Digite o ID do produto que deseja excluir</p>
            </div>

            <div className="delete-container">
              {/* Etapa 1: Formulário de busca */}
              {resultado.length === 0 && (
                <form onSubmit={buscarProdutos} className="delete-form">
                  <div className="form-input">
                    <input
                      type="search"
                      placeholder="Buscar produto por ID ou descrição..."
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
                  <h2>Produto Encontrado</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nome do produto</th>
                        <th>Valor</th>
                        {/*<th>Quantidade</th>*/}
                        <th>Qt. Atual</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.map((p) => (
                        <tr key={p.PRO_ID}>
                          <td>{p.PRO_ID}</td>
                          <td>{p.PRO_Descricao}</td>
                          <td>R$ {parseFloat(p.PRO_Valor).toFixed(2)}</td>
                          {/*<td>{p.PRO_Quantidade}</td>*/}
                          <td>{p.PRO_QtAtual}</td>
                          <td>{p.PRO_Categoria}</td>
                          <td>
                            <button
                              className="delete-btn"
                              onClick={() => deletarProduto(p.PRO_ID)}
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

export default PDelete;
