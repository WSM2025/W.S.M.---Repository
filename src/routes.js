import express from "express";
const router = express.Router();

//Controladores
import cadastrarProdutos from "./controller/cadastrarProdutos.js";
import buscarProdutos from "./controller/buscarProdutos.js";
import cadastrarCliente from "./controller/cadastrarCliente.js";
import atualizarCliente from "./controller/atualizarCliente.js";
import listarClientes from "./controller/listarClientes.js";
import deletarCliente from "./controller/deletarCliente.js";
import cadastrarServico from "./controller/cadastrarServico.js";
import cadastrarFornecedor from "./controller/cadastrarFornecedor.js";
import listarFornecedores from "./controller/listarFornecedores.js";
import atualizarFornecedor from "./controller/atualizarFornecedor.js";
import deletarFornecedor from "./controller/deletarFornecedor.js";
import cadastrarFuncionario from "./controller/cadastrarFuncionario.js";
import listarProdutos from "./controller/listarProdutos.js"; 
import listarFuncionarios from "./controller/listarFuncionarios.js"; 
import atualizarProduto from "./controller/atualizarProduto.js"; 
import deletarProduto from "./controller/deletarProduto.js";
import baixaProduto from "./controller/baixaProduto.js";
import buscarFuncionarios from "./controller/buscarFuncionarios.js";
import atualizarFuncionario from "./controller/atualizarFuncionario.js";
import deletarFuncionario from "./controller/deletarFuncionario.js";
import login from "./controller/login.js";
import loginController from "./controller/login.js";
import gerarAlertasEstoque from "./controller/gerarAlertaEstoque.js";

//Middlewares
import camposPreenchidos from "./middleware/camposPreenchidos.js";
import validarCPF from "./middleware/ValidarCPF.js";
import validateEmail from "./middleware/ValidarEmai.js";
import validateDate from "./middleware/ValidarData.js";

//Rotas dos produtos
router.get("/produtos", listarProdutos); 
router.get("/produtos/categoria/:categoria", buscarProdutos); 
router.get("/produtos/buscar", buscarProdutos);
router.post("/produtos", cadastrarProdutos);
router.put("/produtos/:id", atualizarProduto);
router.put("/produtos/baixa/:id", baixaProduto);
router.delete("/produtos/:id", deletarProduto);

//Rotas dos funcionários
router.get("/funcionarios", listarFuncionarios);
router.get("/funcionarios/buscar", buscarFuncionarios);
router.post("/funcionario", camposPreenchidos, validateDate, cadastrarFuncionario );
router.put("/funcionarios/:id", atualizarFuncionario);
router.delete("/funcionarios/:id", deletarFuncionario);

//Rotas dos clientes
router.post("/cliente", camposPreenchidos, validarCPF, validateEmail, cadastrarCliente);
//router.post("/cliente", camposPreenchidos, cadastrarCliente);
router.get("/clientes", listarClientes);
router.put("/clientes/:cpf", atualizarCliente);
router.delete("/clientes/:cpf", deletarCliente);

//Rotas do fornecedores
router.get("/fornecedores", listarFornecedores);
router.post("/fornecedor", camposPreenchidos, cadastrarFornecedor);
router.put("/fornecedores/:id", atualizarFornecedor);
router.delete("/fornecedores/:id", deletarFornecedor);

//Rotas de serviços
router.post("/servico", camposPreenchidos, validarCPF, cadastrarServico);

//Login
router.post("/login", login);
router.post("/login", loginController);

// Alertas de estoque (dinâmico, sem tabela)
router.get("/alertas-estoque", gerarAlertasEstoque);

export default router;