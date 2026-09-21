import { useState, useEffect } from "react";
import reactLogo from "./assets/logo principal_branca.png";
import reactclient from "./assets/client.jpg";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ useNavigate para redirecionar
import 'boxicons/css/boxicons.min.css';
import api from "./services/api"; // conexão com backend

function PBaixa() {
    const navigate = useNavigate(); // ⬅️ Hook do React Router
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [formData, setFormData] = useState({
    dataBaixa: "",
    quantidade: "",
    desconto: "",
    formaPagamento: "",
    observacao: "",
  });

    // 🔹 Função de logout
  const handleLogout = () => {
    localStorage.removeItem("usuario"); // limpa o usuário logado
    alert("Você saiu do sistema.");
    navigate("/"); // redireciona para a tela de login
  };

  const [valores, setValores] = useState({
    valorPedido: 0,
    valorDesconto: 0,
    valorTotal: 0,
  });

  // 🧠 Carrega produtos cadastrados
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await api.get("/produtos");
        setProdutos(response.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        alert("Erro ao carregar produtos do servidor.");
      }
    };
    carregarProdutos();
  }, []);

  // 🧾 Atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 💰 Recalcula os valores ao mudar quantidade/desconto/produto
  useEffect(() => {
    if (!produtoSelecionado) return;

    const precoUnitario = parseFloat(produtoSelecionado.PRO_Valor || 0);
    const qtd = parseInt(formData.quantidade || 0);
    const desconto = parseFloat(formData.desconto || 0);

    const valorPedido = precoUnitario * qtd;
    const valorDesconto = (valorPedido * desconto) / 100;
    const valorTotal = valorPedido - valorDesconto;

    setValores({ valorPedido, valorDesconto, valorTotal });
  }, [formData.quantidade, formData.desconto, produtoSelecionado]);

  // ❌ Cancelar limpa tudo
  const cancelar = () => {
    setFormData({
      dataBaixa: "",
      quantidade: "",
      desconto: "",
      formaPagamento: "",
      observacao: "",
    });
    setValores({
      valorPedido: 0,
      valorDesconto: 0,
      valorTotal: 0,
    });
    setProdutoSelecionado(null);
  };

  // ✅ Confirmar baixa
  const confirmarBaixa = async (e) => {
    e.preventDefault();

    if (!produtoSelecionado) {
      alert("Selecione um produto para dar baixa.");
      return;
    }

    const qtdBaixa = parseInt(formData.quantidade);
    if (isNaN(qtdBaixa) || qtdBaixa <= 0) {
      alert("Informe uma quantidade válida para baixa.");
      return;
    }

    try {
      await api.put(`/produtos/baixa/${produtoSelecionado.PRO_ID}`, {
        dataBaixa: formData.dataBaixa,
        quantidade: qtdBaixa,
        desconto: parseFloat(formData.desconto || 0),
        formaPagamento: formData.formaPagamento,
        observacao: formData.observacao,
        valorTotal: valores.valorTotal,
      });

      alert("Baixa registrada e serviço salvo com sucesso!");
      cancelar();
    } catch (err) {
      console.error("Erro ao confirmar baixa:", err);
      alert("Erro ao confirmar baixa.");
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
          <li className="active"><Link to="/P_baixa"><i className="bx bx-down-arrow-alt"></i>Dar Baixa</Link></li>
          <li><Link to="/P_delete"><i className="bx bx-trash"></i>Deletar</Link></li>
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
              <h1>Baixa de Produto</h1>
              <p>Dê baixa nos produtos</p>
            </div>

                <div className="bottom-data">
                  <div className="orders">
                    <div className="chartt">
                      <div className="box">
                        <fieldset>
                          {/*<h2>Dar Baixa em Produto</h2>*/}
                          <form onSubmit={confirmarBaixa}>
                              {/* 🔹 Campos organizados em duas colunas */}
                              <div className="form-grid">
                                <div className="form-group">
                                  <label htmlFor="produto">Produto:</label>
                                  <select
                                    id="produto"
                                    value={produtoSelecionado ? produtoSelecionado.PRO_ID : ""}
                                    onChange={(e) =>
                                      setProdutoSelecionado(
                                        produtos.find((p) => p.PRO_ID === parseInt(e.target.value))
                                      )
                                    }
                                    required
                                  >
                                    <option value="">Selecione um produto...</option>
                                    {produtos.map((p) => (
                                      <option key={p.PRO_ID} value={p.PRO_ID}>
                                        {p.PRO_Descricao}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label>Data da Baixa:</label>
                                  <input
                                    type="date"
                                    name="dataBaixa"
                                    value={formData.dataBaixa}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Quantidade:</label>
                                  <input
                                    type="number"
                                    name="quantidade"
                                    value={formData.quantidade}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Desconto (%):</label>
                                  <input
                                    type="number"
                                    name="desconto"
                                    value={formData.desconto}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                  />
                                </div>
                              </div>


                            <label>Forma de Pagamento:</label>
                            <select
                              name="formaPagamento"
                              value={formData.formaPagamento}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Selecione...</option>
                              <option value="Crédito">Cartão de Crédito</option>
                              <option value="Débito">Cartão de Débito</option>
                              <option value="Dinheiro">Dinheiro</option>
                            </select>
                            <br /><br />

                            <label>Observação:</label>
                            <textarea
                              name="observacao"
                              rows="3"
                              value={formData.observacao}
                              onChange={handleChange}
                            ></textarea>
                            <br /><br />
                            <div className="resultado-baixa">
                              <h3>Resumo da Baixa</h3>
                              <p><b>Valor do Pedido:</b> R$ {valores.valorPedido.toFixed(2)}</p>
                              <p><b>Desconto Aplicado:</b> R$ {valores.valorDesconto.toFixed(2)}</p>
                              <p><b>Valor Total:</b> R$ {valores.valorTotal.toFixed(2)}</p>
                            </div>
                              {/* 🔹 Botões lado a lado, alinhados à direita */}
                              <div className="button-row">
                                <button type="button" className="btn-cancelar" onClick={cancelar}>Cancelar</button>
                                <button type="submit" className="btn-confirmar">Confirmar Baixa</button>
                              </div>

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

export default PBaixa;
