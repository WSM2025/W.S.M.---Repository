import pool from "../conexao.js";

const deletarCliente = async (req, res) => {
  const { cpf } = req.params;

  if (!cpf) {
    return res.status(400).json({ erro: "CPF não informado" });
  }

  try {
    const cpfNumber = parseInt(cpf);

    const [result] = await pool.query(
      `DELETE FROM tbl_cliente WHERE CLI_CPF = ?`,
      [cpfNumber]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    return res.status(200).json({ mensagem: "Cliente excluído!" });

  } catch (error) {
    console.error("Erro ao excluir:", error);
    return res.status(500).json({ erro: "Erro interno" });
  }
};

export default deletarCliente;