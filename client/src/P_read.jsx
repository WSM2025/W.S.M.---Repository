import { useState } from 'react';
import reactLogo from './assets/logo principal_branca.png';
import reactclient from "./assets/client.jpg";
import './dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api";

function PList() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  // 🔹 Função de busca simples (igual ao PRead)
  const buscarProdutos = async (e) => {
    e.preventDefault();

    if (!busca.trim()) {
      alert("Digite o ID ou o nome do produto que deseja buscar.");
      return;
    }

    try {
      const response = await api.get(`/produtos/buscar?termo=${busca}`);
      setProdutos(response.data);
    } catch (err) {
      console.error("Erro ao buscar produto:", err);
      alert("Erro ao buscar produto.");
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
          <li><Link to="/dashboard"><i className="bx bx-home"></i>Dashboard</Link></li>
          <li><Link to="/P_create"><i className="bx bx-box"></i>Cadastrar Produto</Link></li>
          <li><Link to="/P_list"><i className="bx bx-receipt"></i>Estoque</Link></li>
          <li className="active"><Link to="/P_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li><Link to="/P_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
          <li><Link to="/P_baixa"><i className="bx bx-down-arrow-alt"></i>Dar Baixa</Link></li>
          <li><Link to="/P_delete"><i className="bx bx-trash"></i>Deletar</Link></li>
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
              <h1>Busca de Produtos</h1>
              <p>Consulte os produtos cadastrados</p>
            </div>

            <div className="list-container">
              <form onSubmit={buscarProdutos} className="list-form">
                <input
                  type="search"
                  placeholder="Buscar por ID ou nome do produto..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <button type="submit">Buscar</button>
              </form>

              <fieldset className="list-result">
                {/*<h2>Lista de Produtos</h2>*/}
                <table className="list-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome do produto</th>
                      <th>Valor</th>
                      {/*<th>Quantidade</th>*/  }
                      <th>Qt. Atual</th>
                      <th>Categoria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.length > 0 ? (
                      produtos.map((p) => (
                        <tr key={p.PRO_ID}>
                          <td>{p.PRO_ID}</td>
                          <td>{p.PRO_Descricao}</td>
                          <td>R$ {parseFloat(p.PRO_Valor).toFixed(2)}</td>
                          {/*<td>{p.PRO_Quantidade}</td>*/}
                          <td>{p.PRO_QtAtual}</td>
                          <td>{p.PRO_Categoria}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">Nenhum produto encontrado</td>
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

export default PList;
