import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./services/api";
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import "./dashboard.css";
import "boxicons/css/boxicons.min.css";

function FSupplier() {
    const navigate = useNavigate();

    const [fornecedores, setFornecedores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editarFornecedor, setEditarFornecedor] = useState(null);
    
    const [novoFornecedor, setNovoFornecedor] = useState({
        nome: "",
        tipo: "",
        ativo: "S"
    });

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("usuario");
        alert("Você saiu do sistema.");
        navigate("/");
    };

    // Carregar fornecedores
    const carregarFornecedores = async () => {
        try {
            const response = await api.get("/fornecedores");
            setFornecedores(response.data);
        } catch (err) {
            console.error("Erro ao carregar fornecedores:", err);
        }
    };

    useEffect(() => {
        carregarFornecedores();
    }, []);

    // Captura mudança nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoFornecedor({ ...novoFornecedor, [name]: value });
    };

    // Abrir modal para edição
    const abrirEditar = (fornecedor) => {
        setEditarFornecedor(fornecedor);
        setNovoFornecedor({ ...fornecedor });
        setShowModal(true);
    };

    // Fechar modal
    const fecharModal = () => {
        setShowModal(false);
        setEditarFornecedor(null);
        setNovoFornecedor({
            nome: "",
            tipo: "",
            ativo: "S"
        });
    };

    // Salvar fornecedor
    const handleSalvar = async () => {
        if (!novoFornecedor.nome) {
            alert("Nome é obrigatório!");
            return;
        }

        try {
            setLoading(true);
            
            if (editarFornecedor) {
                await api.put(`/fornecedores/${editarFornecedor.id}`, novoFornecedor);
                alert("Fornecedor atualizado com sucesso!");
            } else {
                await api.post("/fornecedor", novoFornecedor);
                alert("Fornecedor cadastrado com sucesso!");
            }

            fecharModal();
            carregarFornecedores();
        } catch (err) {
            console.error("Erro ao salvar fornecedor:", err);
            
            if (err.response?.data?.erro) {
                alert(`Erro: ${err.response.data.erro}`);
            } else {
                alert("Erro ao salvar fornecedor.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Excluir fornecedor
    const handleExcluir = async (id) => {
        if (!window.confirm("Deseja realmente excluir este fornecedor?")) return;
        try {
            await api.delete(`/fornecedores/${id}`);
            carregarFornecedores();
        } catch (err) {
            console.error("Erro ao excluir fornecedor:", err);
            
            if (err.response?.data?.erro) {
                alert(`Erro: ${err.response.data.erro}`);
            } else {
                alert("Erro ao excluir fornecedor.");
            }
        }
    };

    return (
        <>
            <div className="sidebar">
                <ul className="side-menu">
                   <li><Link to="/F_create"><i className="bx bx-id-card"></i>Cadastrar Funcionario</Link></li>
                    <li><Link to="/F_read"><i className="bx bx-search"></i>Buscar</Link></li>
                    <li><Link to="/F_update"><i className="bx bx-edit"></i>Atualizar</Link></li>
                    <li><Link to="/F_list"><i className="bx bx-group"></i>Listar</Link></li>
                    <li><Link to="/F_delete"><i className="bx bx-trash"></i>Deletar</Link></li>
                    <li><Link to="/F_client"><i className="bx bx-user-plus"></i>Cadastrar Cliente</Link></li>
                    <li className="active"><Link to="/F_supplier"><i className="bx bxs-factory"></i>Cadastrar Fornecedor</Link></li>
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
                            <h1>Cadastro do Fornecedor</h1>
                            <p>Salve os dados do fornecedor</p>
                        </div>

                        <div className="list-container">
                            <div className="button-container">
                                <button
                                    type="button"
                                    className="Btn-Cadastro-Cli"
                                    onClick={() => setShowModal(true)}
                                >
                                    Cadastrar Fornecedor
                                </button>
                            </div>

                            <fieldset className="list-result">
                                <table className="list-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Tipo</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fornecedores.length > 0 ? (
                                            fornecedores.map((f) => (
                                                <tr key={f.id}>
                                                    <td>{f.id}</td>
                                                    <td>{f.nome}</td>
                                                    <td>{f.tipo || '-'}</td>
                                                    <td>
                                                        <span className={`status ${f.ativo === 'S' ? 'ativo' : 'inativo'}`}>
                                                            {f.ativo === 'S' ? 'Ativo' : 'Inativo'}
                                                        </span>
                                                    </td>
                                                    <td className="acoes-botoes">
                                                        <button
                                                            className="btn-editar"
                                                            onClick={() => abrirEditar(f)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className="btn-excluir"
                                                            onClick={() => handleExcluir(f.id)}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" align="center">
                                                    Nenhum fornecedor encontrado
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editarFornecedor ? "Editar Fornecedor" : "Cadastrar Novo Fornecedor"}</h2>

                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome do fornecedor *"
                            value={novoFornecedor.nome}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="tipo"
                            placeholder="Tipo de fornecimento"
                            value={novoFornecedor.tipo}
                            onChange={handleChange}
                        />
                        
                        <div className="radio-group">
                            <label>Status:</label>
                            <div className="radio-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="ativo"
                                        value="S"
                                        checked={novoFornecedor.ativo === "S"}
                                        onChange={handleChange}
                                    />
                                    Ativo
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="ativo"
                                        value="N"
                                        checked={novoFornecedor.ativo === "N"}
                                        onChange={handleChange}
                                    />
                                    Inativo
                                </label>
                            </div>
                        </div>

                        <div className="modal-info">
                            <small>💡 Preencha os dados do fornecedor</small>
                        </div>

                        <div className="modal-buttons">
                            <button className="btn-cancelar" onClick={fecharModal}>
                                Cancelar
                            </button>
                            <button className="btn-salvar" onClick={handleSalvar} disabled={loading}>
                                {loading ? "Salvando..." : "Salvar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FSupplier;