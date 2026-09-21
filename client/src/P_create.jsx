import { useState } from 'react';
import reactLogo from './assets/logo principal_branca.png';
import reactclient from "./assets/client.jpg";
import './dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api";

function PCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    quantidade: '',
    categoria: '',
  });

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validaForm = async (e) => {
    e.preventDefault();
    const { descricao, valor, quantidade, categoria } = formData;

    if (!descricao || !valor || !quantidade || !categoria) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await api.post("/produtos", {
        descricao,
        valor,
        qtEntrada: quantidade, // quantidade inicial
        categoria,
      });

      alert("Produto cadastrado com sucesso!");
      setFormData({ descricao: "", valor: "", quantidade: "", categoria: "" });
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
          <li><Link to="/dashboard"><i className="bx bx-home"></i>Dashboard</Link></li>
          <li className="active"><Link to="/P_create"><i className="bx bx-box"></i>Cadastrar Produto</Link></li>
          <li><Link to="/P_list"><i className="bx bx-receipt"></i>Estoque</Link></li>
          <li><Link to="/P_read"><i className="bx bx-search"></i>Buscar</Link></li>
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
                <h1>Cadastros de Produtos</h1>
                <p>Preencha os dados do novo produto</p>
              </div>
            <div className="bottom-data">
              <div className="orders">
                <div className="chartt">
                  <div className="box">
                    <fieldset>
                      {/*<h2>Cadastro de Produtos</h2>*/}
                      <form onSubmit={validaForm}>
                        <label htmlFor="descricao">Nome do produto:</label>
                        <input
                          type="text"
                          id="descricao"
                          name="descricao"
                          value={formData.descricao}
                          onChange={handleChange}
                          required
                        /><br /><br />

                        <label htmlFor="valor">Valor:</label>
                        <input
                          type="number"
                          step="0.01"
                          id="valor"
                          name="valor"
                          value={formData.valor}
                          onChange={handleChange}
                          required
                        /><br /><br />

                        <label htmlFor="quantidade">Quantidade Inicial:</label>
                        <input
                          type="number"
                          id="quantidade"
                          name="quantidade"
                          value={formData.quantidade}
                          onChange={handleChange}
                          required
                        /><br /><br />

                        <label htmlFor="categoria">Categoria:</label>
                        <input
                          type="text"
                          id="categoria"
                          name="categoria"
                          value={formData.categoria}
                          onChange={handleChange}
                          required
                        /><br /><br />

                        <button type="submit">Cadastrar Produto</button>
                      </form>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default PCreate;
