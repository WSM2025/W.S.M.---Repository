import pool from "../conexao.js";

const atualizarCliente = async (req, res) => {
  console.log("🔍 DADOS RECEBIDOS PARA EDIÇÃO:", {
    params: req.params,
    body: req.body
  });

  const { cpf } = req.params;
  const { nome, telefone, email, endereco } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  try {
    const cpfNumber = parseInt(cpf);

    console.log("Atualizando cliente CPF:", cpfNumber);

    const [result] = await pool.query(
      `UPDATE tbl_cliente 
       SET CLI_Nome = ?, CLI_Fone = ?, CLI_Email = ?, CLI_Endereco = ?
       WHERE CLI_CPF = ?`,
      [nome, telefone, email, endereco, cpfNumber]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    console.log("Cliente atualizado!");
    return res.json({ mensagem: "Cliente atualizado com sucesso!" });

  } catch (error) {
    console.error("Erro ao atualizar:", error);
    return res.status(500).json({
      erro: "Erro interno do servidor",
      detalhe: error.message
    });
  }
};

export default atualizarCliente;