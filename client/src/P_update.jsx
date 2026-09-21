import { useState } from "react";
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api";

function PUpdate() {
  const navigate = useNavigate();
  const [idBusca, setIdBusca] = useState("");
  const [produto, setProduto] = useState(null);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  // 🔹 Buscar produto pelo ID
  const buscarProduto = async (e) => {
    e.preventDefault();

    if (!idBusca.trim()) {
      alert("Informe o ID do produto para buscar.");
      return;
    }

    try {
      const response = await api.get(`/produtos/buscar?termo=${idBusca}`);
      if (response.data.length === 0) {
        alert("Produto não encontrado!");
        setProduto(null);
        return;
      }
      setProduto(response.data[0]);
    } catch (err) {
      console.error("Erro ao buscar produto:", err);
      alert("Erro ao buscar produto.");
    }
  };

  // 🔹 Atualizar produto
  const atualizarProduto = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/produtos/${produto.PRO_ID}`, {
        PRO_Descricao: produto.PRO_Descricao,
        PRO_Valor: produto.PRO_Valor,
        PRO_QtAtual: produto.PRO_QtAtual,
        PRO_Categoria: produto.PRO_Categoria,
      });

      alert("Produto atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      alert("Erro ao atualizar produto.");
    }
  };

  // 🔹 Controlar input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* ====== SIDEBAR ====== */}
      <div className="sidebar">
        <ul className="side-menu">
          <li><Link to="/dashboard"><i className="bx bx-home"></i>Dashboard</Link></li>
          <li><Link to="/P_create"><i className="bx bx-box"></i>Cadastrar Produto</Link></li>
          <li><Link to="/P_list"><i className="bx bx-receipt"></i>Estoque</Link></li>
          <li><Link to="/P_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li className="active"><Link to="/P_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
          <li><Link to="/P_baixa"><i className="bx bx-down-arrow-alt"></i>Dar Baixa</Link></li>
          <li><Link to="/P_delete"><i className="bx bx-trash"></i>Deletar</Link></li>
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
              <i className="bx bx-log-out-circle"></i> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* ====== CONTEÚDO PRINCIPAL ====== */}
      <div className="content">
        <nav>
          <img src={reactLogo} alt="logo" />
          <img className="logo-cliente" src={reactclient} alt="logo" />
          <h2>Service Facility</h2>
        </nav>

        <main>
          <div className="cabecalho-wrapper">
            <div className="cabecalho-header">
              <h1>Atualização de Produtos</h1>
              <p>Busque o produto e edite as informações abaixo</p>
            </div>

            <div className="update-container">
              {!produto && (
                <form onSubmit={buscarProduto} className="update-form">
                  <div className="form-input">
                    <input
                      type="search"
                      placeholder="Buscar produto por ID..."
                      value={idBusca}
                      onChange={(e) => setIdBusca(e.target.value)}
                    />
                    <button className="search-btn" type="submit">Buscar</button>
                  </div>
                </form>
              )}

              {produto && (
                <fieldset className="update-confirm">
                  <h2>Editar Produto</h2>
                  <form onSubmit={atualizarProduto}>
                    <label>ID:</label>
                    <input
                      type="text"
                      name="PRO_ID"
                      value={produto.PRO_ID}
                      onChange={handleChange}
                      required
                    />

                    <label>Nome do produto:</label>
                    <input
                      type="text"
                      name="PRO_Descricao"
                      value={produto.PRO_Descricao}
                      onChange={handleChange}
                      required
                    />

                    <label>Valor:</label>
                    <input
                      type="number"
                      step="0.01"
                      name="PRO_Valor"
                      value={produto.PRO_Valor}
                      onChange={handleChange}
                      required
                    />

                    <label>Quantidade Atual:</label>
                    <input
                      type="number"
                      name="PRO_QtAtual"
                      value={produto.PRO_QtAtual}
                      onChange={handleChange}
                      required
                    />

                    <label>Categoria:</label>
                    <input
                      type="text"
                      name="PRO_Categoria"
                      value={produto.PRO_Categoria}
                      onChange={handleChange}
                      required
                    />

                    <button type="submit">Atualizar Produto</button>
                  </form>
                </fieldset>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default PUpdate;
