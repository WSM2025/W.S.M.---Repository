import { useState } from "react";
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import api from "./services/api";

function FUpdate() {
  const navigate = useNavigate();
  const [idBusca, setIdBusca] = useState("");
  const [funcionario, setFuncionario] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    alert("Você saiu do sistema.");
    navigate("/");
  };

  const buscarFuncionario = async (e) => {
    e.preventDefault();
    if (!idBusca.trim()) {
      alert("Informe o código do funcionário para buscar.");
      return;
    }

    try {
      const response = await api.get(`/funcionarios/buscar?termo=${idBusca}`);
      if (response.data.length === 0) {
        alert("Funcionário não encontrado.");
        setFuncionario(null);
      } else {
        setFuncionario(response.data[0]);
      }
    } catch (err) {
      console.error("Erro ao buscar funcionário:", err);
      alert("Erro ao buscar funcionário.");
      setFuncionario(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuncionario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const atualizarFuncionario = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/funcionarios/${funcionario.FUN_Codigo}`, {
        FUN_Nome: funcionario.FUN_Nome,
        FUN_Endereco: funcionario.FUN_Endereco,
        FUN_DtNasc: funcionario.FUN_DtNasc,
        FUN_Senha: funcionario.FUN_Senha,
        FUN_Nivel: funcionario.FUN_Nivel,
      });

      alert("Funcionário atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar funcionário:", err);
      alert("Erro ao atualizar funcionário.");
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul className="side-menu">
          <li><Link to="/F_create"><i className="bx bx-id-card"></i>Cadastrar Funcionário</Link></li>
          <li><Link to="/F_read"><i className="bx bx-search"></i>Buscar</Link></li>
          <li className="active"><Link to="/F_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
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
              <h1>Atualização de Funcionário</h1>
              <p>Digite o código do funcionário que deseja atualizar</p>
            </div>

            <div className="update-container">
              {!funcionario && (
                <form onSubmit={buscarFuncionario} className="update-form">
                  <div className="form-input">
                    <input
                      type="search"
                      placeholder="Digite o código do funcionário..."
                      value={idBusca}
                      onChange={(e) => setIdBusca(e.target.value)}
                    />
                    <button className="search-btn" type="submit">Buscar</button>
                  </div>
                </form>
              )}

              {funcionario && (
                <fieldset className="update-confirm">
                  <h2>Editar Funcionário</h2>
                  <form onSubmit={atualizarFuncionario}>
                    <label>Nome:</label>
                    <input
                      type="text"
                      name="FUN_Nome"
                      value={funcionario.FUN_Nome}
                      onChange={handleChange}
                      required
                    />

                    <label>Endereço:</label>
                    <input
                      type="text"
                      name="FUN_Endereco"
                      value={funcionario.FUN_Endereco}
                      onChange={handleChange}
                      required
                    />

                    <label>Data de Nascimento:</label>
                    <input
                      type="date"
                      name="FUN_DtNasc"
                      value={funcionario.FUN_DtNasc ? funcionario.FUN_DtNasc.slice(0, 10) : ""}
                      onChange={handleChange}
                      required
                    />

                    <label>Senha:</label>
                    <input
                      type="password"
                      name="FUN_Senha"
                      value={funcionario.FUN_Senha}
                      onChange={handleChange}
                      required
                    />

                    <label>Nível:</label>
                    <input
                      type="number"
                      name="FUN_Nivel"
                      min="0"
                      max="9"
                      value={funcionario.FUN_Nivel}
                      onChange={handleChange}
                      required
                    />

                    <button type="submit">Atualizar Funcionário</button>
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

export default FUpdate;
