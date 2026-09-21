-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03/12/2025 às 16:15
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `wsm`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `atualiza_cliente` (IN `P_CPF` INT, `P_Nome` VARCHAR(10), `P_Fone` VARCHAR(10), `P_Email` VARCHAR(100), `P_Endereco` VARCHAR(255))   begin
  update TBL_Cliente
  set CLI_Nome = P_Nome, CLI_Fone = P_Fone, CLI_Email = P_Email, CLI_Endereco = P_Endereco
  where CLI_CPF = P_CPF;
  select * from TBL_Cliente;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `atualiza_estoque` (IN `P_ID` INT, `P_QtEntrada` INT, `P_DataEntrada` DATETIME, `P_PRO_ID` INT)   begin 
  update TBL_Estoque 
  set EST_QtEntrada = P_QtEntrada, EST_DataEntrada = P_DataEntrada, PRO_ID = P_PRO_ID 
  where EST_ID = P_ID; 
  select * from TBL_Estoque; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `atualiza_fornecedor` (IN `P_ID` INT, `P_Nome` VARCHAR(100), `P_Tipo` VARCHAR(100), `P_Ativo` CHAR(1))   begin
  update TBL_Fornecedor
  set FOR_Nome = P_Nome, FOR_Tipo = P_Tipo, FOR_Ativo = P_Ativo
  where FOR_ID = P_ID;
  select * from TBL_Fornecedor;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `atualiza_funcionario` (IN `P_ID` INT, `P_Endereco` VARCHAR(255), `P_DtNasc` DATETIME, `P_Nome` VARCHAR(100), `P_Senha` VARCHAR(30), `P_Nivel` CHAR(1))   begin
  update TBL_Funcionario
  set FUN_Endereco = P_Endereco, FUN_DtNasc = P_DtNasc, FUN_Nome = P_Nome, FUN_Senha = P_Senha, FUN_Nivel = P_Nivel
  where FUN_Codigo = P_ID;
  select * from TBL_Funcionario;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `atualiza_produto` (IN `P_ID` INT, `P_Valor` DECIMAL(10), `P_QtAtual` INT, `P_Quantidade` INT, `P_Descricao` VARCHAR(255), `P_Categoria` VARCHAR(100))   begin
  update TBL_Produto
  set PRO_Valor = P_Valor, PRO_QtAtual = P_QtAtual, PRO_Quantidade = P_Quantidade, PRO_Descricao = P_Descricao, PRO_Categoria = P_Categoria
  where PRO_ID = P_ID;
  select * from TBL_Produto;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `atualiza_profor` (IN `P_FOR_ID` INT, `P_PRO_ID` INT, `P_FOR_ID_NEW` INT, `P_PRO_ID_NEW` INT)   begin 
  update TBL_Profor 
  set FOR_ID = P_FOR_ID_NEW, PRO_ID = P_PRO_ID_NEW 
  where FOR_ID = P_FOR_ID and PRO_ID = P_PRO_ID; 
  select * from TBL_Profor; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `atualiza_proped` (IN `P_SER_ID` INT, `P_PRO_ID` INT, `P_SER_ID_NEW` INT, `P_PRO_ID_NEW` INT)   begin 
  update TBL_Proped 
  set SER_ID = P_SER_ID_NEW, PRO_ID = P_PRO_ID_NEW 
  where SER_ID = P_SER_ID and PRO_ID = P_PRO_ID; 
  select * from TBL_Proped; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `atualiza_servico` (IN `P_ID` INT, `P_Obs` VARCHAR(255), `P_Data` DATETIME, `P_Valor` DECIMAL(10), `P_Forma` VARCHAR(17), `P_Desconto` DECIMAL(10), `P_Qtd` INT)   begin
  update TBL_Servico
  set SER_Observacao = P_Obs, SER_Data = P_Data, SER_ValorPedido = P_Valor, SER_FormaPagamento = P_Forma, SER_Desconto = P_Desconto, SER_Quantidade = P_Qtd
  where SER_ID = P_ID;
  select * from TBL_Servico;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exclui_cliente` (IN `P_CPF` INT)   begin
  delete from TBL_Cliente where CLI_CPF = P_CPF;
  select * from TBL_Cliente;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exclui_estoque` (IN `P_ID` INT)   begin 
  delete from TBL_Estoque where EST_ID = P_ID; 
  select * from TBL_Estoque; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exclui_fornecedor` (IN `P_ID` INT)   begin
  delete from TBL_Fornecedor where FOR_ID = P_ID;
  select * from TBL_Fornecedor;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exclui_funcionario` (IN `P_ID` INT)   begin
  delete from TBL_Funcionario where FUN_Codigo = P_ID;
  select * from TBL_Funcionario;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exclui_produto` (IN `P_ID` INT)   begin
  delete from TBL_Produto where PRO_ID = P_ID;
  select * from TBL_Produto;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exclui_profor` (IN `P_FOR_ID` INT, `P_PRO_ID` INT)   begin 
  delete from TBL_Profor where FOR_ID = P_FOR_ID and PRO_ID = P_PRO_ID; 
  select * from TBL_Profor; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exclui_proped` (IN `P_SER_ID` INT, `P_PRO_ID` INT)   begin 
  delete from TBL_Proped where SER_ID = P_SER_ID and PRO_ID = P_PRO_ID; 
  select * from TBL_Proped; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `exclui_servico` (IN `P_ID` INT)   begin
  delete from TBL_Servico where SER_ID = P_ID;
  select * from TBL_Servico;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_cliente` (IN `P_CPF` INT, `P_Nome` VARCHAR(10), `P_Fone` VARCHAR(10), `P_Email` VARCHAR(100), `P_Endereco` VARCHAR(255))   begin
  insert into TBL_Cliente (CLI_CPF, CLI_Nome, CLI_Fone, CLI_Email, CLI_Endereco)
  values (P_CPF, P_Nome, P_Fone, P_Email, P_Endereco);
  select * from TBL_Cliente;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_estoque` (IN `P_QtEntrada` INT, `P_DataEntrada` DATETIME, `P_PRO_ID` INT)   begin 
  insert into TBL_Estoque (EST_QtEntrada, EST_DataEntrada, PRO_ID) 
  values (P_QtEntrada, P_DataEntrada, P_PRO_ID); 
  select * from TBL_Estoque; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_fornecedor` (IN `P_Nome` VARCHAR(100), `P_Tipo` VARCHAR(100), `P_Ativo` CHAR(1))   begin
  insert into TBL_Fornecedor (FOR_Nome, FOR_Tipo, FOR_Ativo)
  values (P_Nome, P_Tipo, P_Ativo);
  select * from TBL_Fornecedor;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_funcionario` (IN `P_Endereco` VARCHAR(255), `P_DtNasc` DATETIME, `P_Nome` VARCHAR(100), `P_Senha` VARCHAR(30), `P_Nivel` CHAR(1))   begin
  insert into TBL_Funcionario (FUN_Endereco, FUN_DtNasc, FUN_Nome, FUN_Senha, FUN_Nivel)
  values (P_Endereco, P_DtNasc, P_Nome, P_Senha, P_Nivel);
  select * from TBL_Funcionario;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_produto` (IN `P_Valor` DECIMAL(10), `P_QtAtual` INT, `P_Quantidade` INT, `P_Descricao` VARCHAR(255), `P_Categoria` VARCHAR(100))   begin
  insert into TBL_Produto (PRO_Valor, PRO_QtAtual, PRO_Quantidade, PRO_Descricao, PRO_Categoria)
  values (P_Valor, P_QtAtual, P_Quantidade, P_Descricao, P_Categoria);
  select * from TBL_Produto;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_profor` (IN `P_FOR_ID` INT, `P_PRO_ID` INT)   begin 
  insert into TBL_Profor (FOR_ID, PRO_ID) 
  values (P_FOR_ID, P_PRO_ID); 
  select * from TBL_Profor; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_proped` (IN `P_SER_ID` INT, `P_PRO_ID` INT)   begin 
  insert into TBL_Proped (SER_ID, PRO_ID) 
  values (P_SER_ID, P_PRO_ID); 
  select * from TBL_Proped; 
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insere_servico` (IN `P_Obs` VARCHAR(255), `P_Data` DATETIME, `P_Valor` DECIMAL(10), `P_Forma` VARCHAR(17), `P_Desconto` DECIMAL(10), `P_Qtd` INT, `P_CPF` INT, `P_FOR` INT, `P_FUN` INT)   begin
  insert into TBL_Servico (SER_Observacao, SER_Data, SER_ValorPedido, SER_FormaPagamento, SER_Desconto, SER_Quantidade, CLI_CPF, FOR_ID, FUN_Codigo)
  values (P_Obs, P_Data, P_Valor, P_Forma, P_Desconto, P_Qtd, P_CPF, P_FOR, P_FUN);
  select * from TBL_Servico;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_cliente`
--

CREATE TABLE `tbl_cliente` (
  `CLI_Fone` varchar(11) DEFAULT NULL,
  `CLI_CPF` bigint(20) NOT NULL,
  `CLI_Nome` varchar(100) DEFAULT NULL,
  `CLI_Email` varchar(100) DEFAULT NULL,
  `CLI_Endereco` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_cliente`
--

INSERT INTO `tbl_cliente` (`CLI_Fone`, `CLI_CPF`, `CLI_Nome`, `CLI_Email`, `CLI_Endereco`) VALUES
('2198765432', 1112233344, 'João Airto', 'joao@arclima.com', 'Rua Central, 54'),
('1298765432', 2147483647, 'Carlos Fri', 'carlos@clima.com', 'Rua das Torres, 100'),
('12936326280', 3067437012, 'Alberto Pompeu Filho', 'Alberto123Filho@gmail.com', 'Av. Bosque da Saúde'),
('12996658741', 15926348773, 'Thiago Lica', 'thiagoLica@gmail.com', 'Av. Central'),
('12933648010', 19113323091, 'Juca Lima Lica', 'JucaLL89@gmail.com', 'Rua Dom Panda'),
('18999562315', 39944265020, 'Jucimar Benedito Santos', 'JucimarB123@gmail.com', 'Rua 2 de janeiro'),
('12996637203', 41832158896, 'Shawn Mendes', 'lucasslimalica@gmail.com', 'Av. Coronel Leonel'),
('12998756325', 46198723031, 'Cebolinha Alberto Filho', 'CMj@hotmail.com', 'Av. 12 de fevereiro'),
('12988754213', 48719562312, 'Francisco Sila Oliveira', 'FSo@gmail.com', 'Av.Sabugosa'),
('15997723015', 99988877766, 'Cida Aparecida', 'CApar@gmail.com', 'Rua Dominique Espanhol');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_estoque`
--

CREATE TABLE `tbl_estoque` (
  `EST_QtEntrada` int(11) DEFAULT NULL,
  `EST_ID` int(11) NOT NULL,
  `EST_DataEntrada` datetime DEFAULT NULL,
  `PRO_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_estoque`
--

INSERT INTO `tbl_estoque` (`EST_QtEntrada`, `EST_ID`, `EST_DataEntrada`, `PRO_ID`) VALUES
(5, 1, '2025-10-03 22:40:08', 1),
(5, 3, '2025-10-14 22:57:27', 3),
(500, 6, '2025-10-29 22:45:40', 6),
(50, 8, '2025-11-05 23:36:02', 8),
(30, 9, '2025-11-01 10:00:00', 1),
(60, 11, '2025-11-10 09:20:00', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_fornecedor`
--

CREATE TABLE `tbl_fornecedor` (
  `FOR_ID` int(11) NOT NULL,
  `FOR_Nome` varchar(100) DEFAULT NULL,
  `FOR_Tipo` varchar(100) DEFAULT NULL,
  `FOR_Ativo` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_fornecedor`
--

INSERT INTO `tbl_fornecedor` (`FOR_ID`, `FOR_Nome`, `FOR_Tipo`, `FOR_Ativo`) VALUES
(1, 'ClimaTech Distribuidora', 'Peças de Ar-Condicionado', 'S'),
(3, 'Ventilar Ltda', 'Ventiladores Industriais', 'N'),
(4, 'Samsung', 'Evaporadora e Climatização', 'S'),
(5, 'Expo Clima', 'Ferramentas', 'N'),
(6, 'Air Frio', 'Ar-condicionado', 'S'),
(7, 'Royalstar', 'Ferramentas', 'S'),
(9, 'Pescan', 'Removedor de Ferrugem', 'N');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_funcionario`
--

CREATE TABLE `tbl_funcionario` (
  `FUN_Codigo` int(11) NOT NULL,
  `FUN_Endereco` varchar(255) DEFAULT NULL,
  `FUN_DtNasc` datetime DEFAULT NULL,
  `FUN_Nome` varchar(100) DEFAULT NULL,
  `FUN_Senha` varchar(30) NOT NULL,
  `FUN_Nivel` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_funcionario`
--

INSERT INTO `tbl_funcionario` (`FUN_Codigo`, `FUN_Endereco`, `FUN_DtNasc`, `FUN_Nome`, `FUN_Senha`, `FUN_Nivel`) VALUES
(3, 'Av. Brasil', '1987-08-19 00:00:00', 'Miguel', '654', '1'),
(7, 'Av.Dom Pedro I', '1998-02-12 04:00:00', 'Gildárcio', '159', '2'),
(8, 'Rua Azul, 10', '1990-05-15 00:00:00', 'Ana Climatizadora', 'L@77', '1'),
(9, 'Av. Verde, 200', '1985-08-20 00:00:00', 'Pedro Refrigeração', 'carl0s', '2'),
(10, 'Rua Amarela, 55', '1992-12-01 00:00:00', 'Julia Ventilação', '98076', '2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_produto`
--

CREATE TABLE `tbl_produto` (
  `PRO_ID` int(11) NOT NULL,
  `PRO_Valor` decimal(10,2) DEFAULT NULL,
  `PRO_QtAtual` int(11) DEFAULT NULL,
  `PRO_Quantidade` int(11) DEFAULT NULL,
  `PRO_Descricao` varchar(255) DEFAULT NULL,
  `PRO_Categoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_produto`
--

INSERT INTO `tbl_produto` (`PRO_ID`, `PRO_Valor`, `PRO_QtAtual`, `PRO_Quantidade`, `PRO_Descricao`, `PRO_Categoria`) VALUES
(1, 20.00, 18, 5, 'Alicate Amperímetro', 'Ferramentas'),
(3, 10.00, 40, 5, 'Alicate', 'Ferramentas'),
(6, 2.00, 496, 23, 'Bobina', 'Peças'),
(8, 1800.00, 7, 0, 'Ar Condicionado Split Elgin Hi Wall Eco Inverter II', 'Ar Condicionado'),
(9, 2500.00, 10, 30, 'Ar-Condicionado Split 12000 BTUs', 'Climatização'),
(10, 180.00, 50, 100, 'Ventilador de Coluna Industrial', 'Ventilação'),
(11, 350.00, 20, 60, 'Purificador de Ar HEPA', 'Filtragem');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_profor`
--

CREATE TABLE `tbl_profor` (
  `FOR_ID` int(11) DEFAULT NULL,
  `PRO_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_profor`
--

INSERT INTO `tbl_profor` (`FOR_ID`, `PRO_ID`) VALUES
(1, 1),
(3, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_proped`
--

CREATE TABLE `tbl_proped` (
  `SER_ID` int(11) DEFAULT NULL,
  `PRO_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_proped`
--

INSERT INTO `tbl_proped` (`SER_ID`, `PRO_ID`) VALUES
(1, 1),
(2, 8),
(1, 1),
(6, 8),
(7, 8);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_servico`
--

CREATE TABLE `tbl_servico` (
  `SER_ID` int(11) NOT NULL,
  `SER_Observacao` varchar(255) DEFAULT NULL,
  `SER_Data` datetime DEFAULT NULL,
  `SER_ValorPedido` decimal(10,2) DEFAULT NULL,
  `SER_FormaPagamento` varchar(17) DEFAULT NULL,
  `SER_Desconto` decimal(10,2) DEFAULT NULL,
  `SER_Quantidade` int(11) DEFAULT NULL,
  `CLI_CPF` bigint(20) DEFAULT NULL,
  `FOR_ID` int(11) DEFAULT NULL,
  `FUN_Codigo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_servico`
--

INSERT INTO `tbl_servico` (`SER_ID`, `SER_Observacao`, `SER_Data`, `SER_ValorPedido`, `SER_FormaPagamento`, `SER_Desconto`, `SER_Quantidade`, `CLI_CPF`, `FOR_ID`, `FUN_Codigo`) VALUES
(1, 'Demorou', '2025-10-15 00:00:00', 16.00, 'Dinheiro', 20.00, 2, NULL, NULL, NULL),
(2, 'Foram entregue o produto dentro do prazo.', '2025-11-05 00:00:00', 19440.00, 'Dinheiro', 10.00, 12, NULL, NULL, NULL),
(5, 'Troca de filtro HEPA', '2025-11-17 11:00:00', 350.00, 'Dinheiro', 0.00, 1, 2147483647, 3, 3),
(6, 'Troca de aparelhos antigos', '2025-11-26 00:00:00', 48600.00, 'Dinheiro', 10.00, 30, NULL, NULL, NULL),
(7, 'Troca de produto no escritório Dom Wolf', '2025-11-27 00:00:00', 1260.00, 'Dinheiro', 30.00, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_clientes_email`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_clientes_email` (
`CLI_Nome` varchar(100)
,`CLI_Email` varchar(100)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_clientes_servicos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_clientes_servicos` (
`CLI_Nome` varchar(100)
,`SER_Data` datetime
,`SER_ValorPedido` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_estoque_movimentacao`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_estoque_movimentacao` (
`EST_DataEntrada` datetime
,`total_entradas` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_estoque_produtos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_estoque_produtos` (
`EST_ID` int(11)
,`EST_QtEntrada` int(11)
,`EST_DataEntrada` datetime
,`PRO_Descricao` varchar(255)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_fornecedores_ativos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_fornecedores_ativos` (
`FOR_ID` int(11)
,`FOR_Nome` varchar(100)
,`FOR_Tipo` varchar(100)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_fornecedores_produtos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_fornecedores_produtos` (
`FOR_Nome` varchar(100)
,`PRO_Descricao` varchar(255)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_funcionarios_nivel`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_funcionarios_nivel` (
`FUN_Nome` varchar(100)
,`FUN_Nivel` char(1)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_funcionarios_servicos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_funcionarios_servicos` (
`FUN_Nome` varchar(100)
,`SER_Data` datetime
,`SER_ValorPedido` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_produtos_categoria`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_produtos_categoria` (
`PRO_Categoria` varchar(100)
,`total` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_produtos_estoque`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_produtos_estoque` (
`PRO_Descricao` varchar(255)
,`EST_QtEntrada` int(11)
,`EST_DataEntrada` datetime
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_profor_contagem`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_profor_contagem` (
`FOR_Nome` varchar(100)
,`qtd_produtos` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_profor_fornecedor_produto`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_profor_fornecedor_produto` (
`FOR_Nome` varchar(100)
,`PRO_Descricao` varchar(255)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_proped_quantidade`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_proped_quantidade` (
`PRO_Descricao` varchar(255)
,`qtd_servicos` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_proped_servicos_produtos`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_proped_servicos_produtos` (
`SER_ID` int(11)
,`SER_Data` datetime
,`PRO_Descricao` varchar(255)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_servicos_clientes`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_servicos_clientes` (
`SER_ID` int(11)
,`CLI_Nome` varchar(100)
,`SER_ValorPedido` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_servicos_funcionarios`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_servicos_funcionarios` (
`SER_ID` int(11)
,`FUN_Nome` varchar(100)
,`SER_Data` datetime
);

-- --------------------------------------------------------

--
-- Estrutura para view `vw_clientes_email`
--
DROP TABLE IF EXISTS `vw_clientes_email`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_clientes_email`  AS SELECT `tbl_cliente`.`CLI_Nome` AS `CLI_Nome`, `tbl_cliente`.`CLI_Email` AS `CLI_Email` FROM `tbl_cliente` ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_clientes_servicos`
--
DROP TABLE IF EXISTS `vw_clientes_servicos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_clientes_servicos`  AS SELECT `c`.`CLI_Nome` AS `CLI_Nome`, `s`.`SER_Data` AS `SER_Data`, `s`.`SER_ValorPedido` AS `SER_ValorPedido` FROM (`tbl_cliente` `c` join `tbl_servico` `s` on(`c`.`CLI_CPF` = `s`.`CLI_CPF`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_estoque_movimentacao`
--
DROP TABLE IF EXISTS `vw_estoque_movimentacao`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_estoque_movimentacao`  AS SELECT `tbl_estoque`.`EST_DataEntrada` AS `EST_DataEntrada`, sum(`tbl_estoque`.`EST_QtEntrada`) AS `total_entradas` FROM `tbl_estoque` GROUP BY `tbl_estoque`.`EST_DataEntrada` ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_estoque_produtos`
--
DROP TABLE IF EXISTS `vw_estoque_produtos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_estoque_produtos`  AS SELECT `e`.`EST_ID` AS `EST_ID`, `e`.`EST_QtEntrada` AS `EST_QtEntrada`, `e`.`EST_DataEntrada` AS `EST_DataEntrada`, `p`.`PRO_Descricao` AS `PRO_Descricao` FROM (`tbl_estoque` `e` join `tbl_produto` `p` on(`e`.`PRO_ID` = `p`.`PRO_ID`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_fornecedores_ativos`
--
DROP TABLE IF EXISTS `vw_fornecedores_ativos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_fornecedores_ativos`  AS SELECT `tbl_fornecedor`.`FOR_ID` AS `FOR_ID`, `tbl_fornecedor`.`FOR_Nome` AS `FOR_Nome`, `tbl_fornecedor`.`FOR_Tipo` AS `FOR_Tipo` FROM `tbl_fornecedor` WHERE `tbl_fornecedor`.`FOR_Ativo` = 'S' ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_fornecedores_produtos`
--
DROP TABLE IF EXISTS `vw_fornecedores_produtos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_fornecedores_produtos`  AS SELECT `f`.`FOR_Nome` AS `FOR_Nome`, `p`.`PRO_Descricao` AS `PRO_Descricao` FROM ((`tbl_fornecedor` `f` join `tbl_profor` `pf` on(`f`.`FOR_ID` = `pf`.`FOR_ID`)) join `tbl_produto` `p` on(`pf`.`PRO_ID` = `p`.`PRO_ID`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_funcionarios_nivel`
--
DROP TABLE IF EXISTS `vw_funcionarios_nivel`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_funcionarios_nivel`  AS SELECT `tbl_funcionario`.`FUN_Nome` AS `FUN_Nome`, `tbl_funcionario`.`FUN_Nivel` AS `FUN_Nivel` FROM `tbl_funcionario` ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_funcionarios_servicos`
--
DROP TABLE IF EXISTS `vw_funcionarios_servicos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_funcionarios_servicos`  AS SELECT `f`.`FUN_Nome` AS `FUN_Nome`, `s`.`SER_Data` AS `SER_Data`, `s`.`SER_ValorPedido` AS `SER_ValorPedido` FROM (`tbl_funcionario` `f` join `tbl_servico` `s` on(`f`.`FUN_Codigo` = `s`.`FUN_Codigo`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_produtos_categoria`
--
DROP TABLE IF EXISTS `vw_produtos_categoria`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_produtos_categoria`  AS SELECT `tbl_produto`.`PRO_Categoria` AS `PRO_Categoria`, count(0) AS `total` FROM `tbl_produto` GROUP BY `tbl_produto`.`PRO_Categoria` ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_produtos_estoque`
--
DROP TABLE IF EXISTS `vw_produtos_estoque`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_produtos_estoque`  AS SELECT `p`.`PRO_Descricao` AS `PRO_Descricao`, `e`.`EST_QtEntrada` AS `EST_QtEntrada`, `e`.`EST_DataEntrada` AS `EST_DataEntrada` FROM (`tbl_produto` `p` join `tbl_estoque` `e` on(`p`.`PRO_ID` = `e`.`PRO_ID`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_profor_contagem`
--
DROP TABLE IF EXISTS `vw_profor_contagem`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_profor_contagem`  AS SELECT `f`.`FOR_Nome` AS `FOR_Nome`, count(0) AS `qtd_produtos` FROM (`tbl_profor` `pf` join `tbl_fornecedor` `f` on(`pf`.`FOR_ID` = `f`.`FOR_ID`)) GROUP BY `f`.`FOR_Nome` ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_profor_fornecedor_produto`
--
DROP TABLE IF EXISTS `vw_profor_fornecedor_produto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_profor_fornecedor_produto`  AS SELECT `f`.`FOR_Nome` AS `FOR_Nome`, `p`.`PRO_Descricao` AS `PRO_Descricao` FROM ((`tbl_profor` `pf` join `tbl_fornecedor` `f` on(`pf`.`FOR_ID` = `f`.`FOR_ID`)) join `tbl_produto` `p` on(`pf`.`PRO_ID` = `p`.`PRO_ID`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_proped_quantidade`
--
DROP TABLE IF EXISTS `vw_proped_quantidade`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_proped_quantidade`  AS SELECT `p`.`PRO_Descricao` AS `PRO_Descricao`, count(0) AS `qtd_servicos` FROM (`tbl_proped` `pr` join `tbl_produto` `p` on(`pr`.`PRO_ID` = `p`.`PRO_ID`)) GROUP BY `p`.`PRO_Descricao` ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_proped_servicos_produtos`
--
DROP TABLE IF EXISTS `vw_proped_servicos_produtos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_proped_servicos_produtos`  AS SELECT `s`.`SER_ID` AS `SER_ID`, `s`.`SER_Data` AS `SER_Data`, `p`.`PRO_Descricao` AS `PRO_Descricao` FROM ((`tbl_proped` `pr` join `tbl_servico` `s` on(`pr`.`SER_ID` = `s`.`SER_ID`)) join `tbl_produto` `p` on(`pr`.`PRO_ID` = `p`.`PRO_ID`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_servicos_clientes`
--
DROP TABLE IF EXISTS `vw_servicos_clientes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_servicos_clientes`  AS SELECT `s`.`SER_ID` AS `SER_ID`, `c`.`CLI_Nome` AS `CLI_Nome`, `s`.`SER_ValorPedido` AS `SER_ValorPedido` FROM (`tbl_servico` `s` join `tbl_cliente` `c` on(`s`.`CLI_CPF` = `c`.`CLI_CPF`)) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_servicos_funcionarios`
--
DROP TABLE IF EXISTS `vw_servicos_funcionarios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_servicos_funcionarios`  AS SELECT `s`.`SER_ID` AS `SER_ID`, `f`.`FUN_Nome` AS `FUN_Nome`, `s`.`SER_Data` AS `SER_Data` FROM (`tbl_servico` `s` join `tbl_funcionario` `f` on(`s`.`FUN_Codigo` = `f`.`FUN_Codigo`)) ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbl_cliente`
--
ALTER TABLE `tbl_cliente`
  ADD PRIMARY KEY (`CLI_CPF`);

--
-- Índices de tabela `tbl_estoque`
--
ALTER TABLE `tbl_estoque`
  ADD PRIMARY KEY (`EST_ID`),
  ADD KEY `PRO_ID` (`PRO_ID`);

--
-- Índices de tabela `tbl_fornecedor`
--
ALTER TABLE `tbl_fornecedor`
  ADD PRIMARY KEY (`FOR_ID`);

--
-- Índices de tabela `tbl_funcionario`
--
ALTER TABLE `tbl_funcionario`
  ADD PRIMARY KEY (`FUN_Codigo`);

--
-- Índices de tabela `tbl_produto`
--
ALTER TABLE `tbl_produto`
  ADD PRIMARY KEY (`PRO_ID`);

--
-- Índices de tabela `tbl_profor`
--
ALTER TABLE `tbl_profor`
  ADD KEY `FOR_ID` (`FOR_ID`),
  ADD KEY `PRO_ID` (`PRO_ID`);

--
-- Índices de tabela `tbl_proped`
--
ALTER TABLE `tbl_proped`
  ADD KEY `SER_ID` (`SER_ID`),
  ADD KEY `PRO_ID` (`PRO_ID`);

--
-- Índices de tabela `tbl_servico`
--
ALTER TABLE `tbl_servico`
  ADD PRIMARY KEY (`SER_ID`),
  ADD KEY `CLI_CPF` (`CLI_CPF`),
  ADD KEY `FOR_ID` (`FOR_ID`),
  ADD KEY `FUN_Codigo` (`FUN_Codigo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbl_estoque`
--
ALTER TABLE `tbl_estoque`
  MODIFY `EST_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `tbl_fornecedor`
--
ALTER TABLE `tbl_fornecedor`
  MODIFY `FOR_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tbl_funcionario`
--
ALTER TABLE `tbl_funcionario`
  MODIFY `FUN_Codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `tbl_produto`
--
ALTER TABLE `tbl_produto`
  MODIFY `PRO_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `tbl_servico`
--
ALTER TABLE `tbl_servico`
  MODIFY `SER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbl_estoque`
--
ALTER TABLE `tbl_estoque`
  ADD CONSTRAINT `tbl_estoque_ibfk_1` FOREIGN KEY (`PRO_ID`) REFERENCES `tbl_produto` (`PRO_ID`);

--
-- Restrições para tabelas `tbl_profor`
--
ALTER TABLE `tbl_profor`
  ADD CONSTRAINT `tbl_profor_ibfk_1` FOREIGN KEY (`FOR_ID`) REFERENCES `tbl_fornecedor` (`FOR_ID`),
  ADD CONSTRAINT `tbl_profor_ibfk_2` FOREIGN KEY (`PRO_ID`) REFERENCES `tbl_produto` (`PRO_ID`);

--
-- Restrições para tabelas `tbl_proped`
--
ALTER TABLE `tbl_proped`
  ADD CONSTRAINT `tbl_proped_ibfk_1` FOREIGN KEY (`SER_ID`) REFERENCES `tbl_servico` (`SER_ID`),
  ADD CONSTRAINT `tbl_proped_ibfk_2` FOREIGN KEY (`PRO_ID`) REFERENCES `tbl_produto` (`PRO_ID`);

--
-- Restrições para tabelas `tbl_servico`
--
ALTER TABLE `tbl_servico`
  ADD CONSTRAINT `tbl_servico_ibfk_1` FOREIGN KEY (`CLI_CPF`) REFERENCES `tbl_cliente` (`CLI_CPF`),
  ADD CONSTRAINT `tbl_servico_ibfk_2` FOREIGN KEY (`FOR_ID`) REFERENCES `tbl_fornecedor` (`FOR_ID`),
  ADD CONSTRAINT `tbl_servico_ibfk_3` FOREIGN KEY (`FUN_Codigo`) REFERENCES `tbl_funcionario` (`FUN_Codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
