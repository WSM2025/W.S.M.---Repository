import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./services/api";
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import "./dashboard.css";
import "boxicons/css/boxicons.min.css";

function FClient() {
    const navigate = useNavigate();

    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editarCliente, setEditarCliente] = useState(null);

    const [novoCliente, setNovoCliente] = useState({
        cpf: "",
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
    });

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("usuario");
        alert("Você saiu do sistema.");
        navigate("/");
    };
    
    // Carregar clientes
    const carregarClientes = async () => {
        try {
            const response = await api.get("/clientes");
            setClientes(response.data);
        } catch (err) {
            console.error("Erro ao carregar clientes:", err);
        }
    };

    useEffect(() => {
        carregarClientes();
    }, []);

    // Formatar CPF para exibição (adiciona zeros à esquerda se necessário)
    const formatarCPFExibicao = (cpf) => {
        if (!cpf) return "";
        return String(cpf).padStart(11, '0');
    };

    // Captura mudança nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "cpf") {
            // Para NOVO cadastro: limita a 11 dígitos
            // Para EDIÇÃO: mantém o que veio do banco (pode ter menos dígitos)
            const cpfLimpo = value.replace(/\D/g, '');
            const cpfLimitado = editarCliente ? cpfLimpo : cpfLimpo.slice(0, 11);
            setNovoCliente({ ...novoCliente, [name]: cpfLimitado });
        } else {
            setNovoCliente({ ...novoCliente, [name]: value });
        }
    };

    // Abrir modal para edição
    const abrirEditar = (cliente) => {
        setEditarCliente(cliente);
        setNovoCliente({ ...cliente });
        setShowModal(true);
    };

    // Fechar modal
    const fecharModal = () => {
        setShowModal(false);
        setEditarCliente(null);
        setNovoCliente({
            cpf: "",
            nome: "",
            telefone: "",
            email: "",
            endereco: "",
        });
    };

    // Salvar cliente - VERSÃO CORRIGIDA
    const handleSalvar = async () => {
        if (!novoCliente.cpf || !novoCliente.nome) {
            alert("CPF e Nome são obrigatórios!");
            return;
        }

        // VALIDAÇÃO DIFERENCIADA
        if (!editarCliente) {
            // NOVO CADASTRO: exige 11 dígitos
            if (novoCliente.cpf.length !== 11) {
                alert("CPF deve ter exatamente 11 dígitos numéricos!");
                return;
            }
        } else {
            // EDIÇÃO: apenas verifica se tem CPF (pode ter menos de 11 dígitos)
            if (!novoCliente.cpf) {
                alert("CPF é obrigatório!");
                return;
            }
        }

        // Validação do nome
        if (novoCliente.nome.length > 100) {
            alert("Nome deve ter no máximo 100 caracteres!");
            return;
        }

        try {
            setLoading(true);
            
            console.log("🔄 Enviando dados:", novoCliente);

            if (editarCliente) {
                await api.put(`/clientes/${editarCliente.cpf}`, novoCliente);
                alert("Cliente atualizado com sucesso!");
            } else {
                await api.post("/cliente", novoCliente);
                alert("Cliente cadastrado com sucesso!");
            }

            fecharModal();
            carregarClientes();
        } catch (err) {
            console.error("❌ Erro completo ao salvar:", err);
            console.error("Resposta do erro:", err.response?.data);
            
            if (err.response?.data?.erro) {
                alert(`Erro: ${err.response.data.erro}`);
            } else {
                alert("Erro ao salvar cliente. Verifique o console.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Excluir cliente
    const handleExcluir = async (cpf) => {
        if (!window.confirm("Deseja realmente excluir este cliente?")) return;
        try {
            await api.delete(`/clientes/${cpf}`);
            carregarClientes();
        } catch (err) {
            console.error("Erro ao excluir cliente:", err);
            alert("Erro ao excluir cliente.");
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
                    <li className="active"><Link to="/F_client"><i className="bx bx-user-plus"></i>Cadastrar Cliente</Link></li>
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
                            <h1>Cadastro do Cliente</h1>
                            <p>Salve os dados do cliente</p>
                        </div>

                        <div className="list-container">
                            <div className="button-container">
                                <button
                                    type="button"
                                    className="Btn-Cadastro-Cli"
                                    onClick={() => setShowModal(true)}
                                >
                                    Cadastrar Cliente
                                </button>
                            </div>

                            <fieldset className="list-result">
                                <table className="list-table">
                                    <thead>
                                        <tr>
                                            <th>CPF</th>
                                            <th>Telefone</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Endereço</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientes.length > 0 ? (
                                            clientes.map((c) => (
                                                <tr key={c.cpf}>
                                                    <td>{formatarCPFExibicao(c.cpf)}</td>
                                                    <td>{c.telefone}</td>
                                                    <td>{c.nome}</td>
                                                    <td>{c.email}</td>
                                                    <td>{c.endereco}</td>
                                                    <td className="acoes-botoes">
                                                        <button
                                                            className="btn-editar"
                                                            onClick={() => abrirEditar(c)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className="btn-excluir"
                                                            onClick={() => handleExcluir(c.cpf)}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" align="center">
                                                    Nenhum cliente encontrado
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
                        <h2>{editarCliente ? "Editar Cliente" : "Cadastrar Novo Cliente"}</h2>

                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={novoCliente.nome}
                            onChange={handleChange}
                            maxLength={100}
                        />
                        <input
                            type="text"
                            name="cpf"
                            placeholder={editarCliente ? "CPF (uso interno)" : "CPF (11 dígitos)"}
                            value={novoCliente.cpf}
                            onChange={handleChange}
                            disabled={!!editarCliente}
                            maxLength={editarCliente ? undefined : 11}
                        />
                        <input
                            type="text"
                            name="telefone"
                            placeholder="Telefone"
                            value={novoCliente.telefone}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={novoCliente.email}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="endereco"
                            placeholder="Endereço"
                            value={novoCliente.endereco}
                            onChange={handleChange}
                        />

                        <div className="modal-info">
                            <small>
                                {editarCliente 
                                    ? "ℹ️ CPF não pode ser editado" 
                                    : "💡 Digite exatamente 11 números para o CPF"
                                }
                            </small>
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

export default FClient;