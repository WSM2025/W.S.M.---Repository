import pool from "../conexao.js";

async function cadastrarCliente(req, res) {
  try {
    const { cpf, nome, telefone, email, endereco } = req.body;

    await pool.query(
      `INSERT INTO tbl_cliente 
        (CLI_CPF, CLI_Nome, CLI_Fone, CLI_Email, CLI_Endereco) 
       VALUES (?, ?, ?, ?, ?)`,
      [cpf, nome, telefone, email, endereco]
    );

    const [rows] = await pool.query(
      `SELECT * FROM tbl_cliente WHERE CLI_CPF = ?`,
      [cpf]
    );

    return res.status(201).json(rows[0]);

  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return res.status(500).json({ erro: "Erro ao cadastrar cliente" });
  }
}

export default cadastrarCliente;