import { useState } from "react";
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api"; // conexão com backend

function FCreate() {
  const navigate = useNavigate(); // ⬅️ Hook do React Router
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    dtNasc: "",
    senha: "",
    nivel: "",
  });

  // 🔹 Função de logout
  const handleLogout = () => {
    localStorage.removeItem("usuario"); // limpa o usuário logado
    alert("Você saiu do sistema.");
    navigate("/"); // redireciona para a tela de login
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
    const { nome, endereco, dtNasc, senha, nivel } = formData;

    if (!nome || !endereco || !dtNasc || !senha || !nivel) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await api.post("/funcionario", {
        nome,
        endereco,
        dtNasc,
        senha,
        nivel,
      });

      alert("Funcionário cadastrado com sucesso!");
      setFormData({
        nome: "",
        endereco: "",
        dtNasc: "",
        senha: "",
        nivel: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar funcionário:", err);
      alert("Erro ao cadastrar funcionário.");
    }
  };
  
  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
          <li className="active"><Link to="/F_create"><i className="bx bx-id-card"></i>Cadastrar Funcionario</Link></li>
          <li><Link to="/F_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li><Link to="/F_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
          <li><Link to="/F_list"><i className="bx bx-group"></i>Listar</Link></li>
          <li><Link to="/F_delete"><i className="bx bx-trash"></i>Deletar</Link></li>
          <li><Link to="/F_client"><i className="bx bx-user-plus"></i>Cadastrar Cliente</Link></li>
          <li><Link to="/F_supplier"><i className="bx bxs-factory"></i>Cadastrar Fornecedor</Link></li>
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

      <div className="content">
        <nav>
          <img src={reactLogo} alt="logo" />
          <img className="logo-cliente" src={reactclient} alt="logo" />
          <h2>Service Facility</h2>
        </nav>

        <main>
          <div className="cabecalho-wrapper">
              <div className="cabecalho-header">
                <h1>Cadastro de Funcionários</h1>
                <p>Preencha os dados do novo funcionário</p>
              </div>
            <div className="bottom-data">
              <div className="orders">
                <div className="chartt">
                  <div className="box">
                    <fieldset>

                      <form onSubmit={validaForm}>
                        <label htmlFor="nome">Nome:</label>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          required
                        />
                        <br /><br />

                        <label htmlFor="endereco">Endereço:</label>
                        <input
                          type="text"
                          id="endereco"
                          name="endereco"
                          value={formData.endereco}
                          onChange={handleChange}
                          required
                        />  
                        <br /><br />

                          <div className="coluna-row">
                            <div className="coluna">
                              <label htmlFor="dtNasc">Data de Nascimento:</label>
                              <input
                                type="date"
                                id="dtNasc"
                                name="dtNasc"
                                value={formData.dtNasc}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="coluna">
                              <label htmlFor="senha">Senha:</label>
                              <input
                                type="password"
                                id="senha"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                        <label htmlFor="nivel">
                          Nível de Acesso (1-Admin; 2-Funcionário):
                        </label>
                        <input
                          type="number"
                          id="nivel"
                          name="nivel"
                          min="0"
                          max="9"
                          value={formData.nivel}
                          onChange={handleChange}
                          required
                        />
                        <br /><br />

                        <button type="submit">Cadastrar Funcionário</button>
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

export default FCreate;
