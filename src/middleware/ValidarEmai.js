import pool from "../conexao.js";

async function buscarEmails(req, res, next) {
  const { email } = req.body;

  // Validação: email não enviado
  if (!email) {
    return res.status(400).json({ mensagem: "Campo email é obrigatório" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM tbl_cliente WHERE CLI_Email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    // Validação de formato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ mensagem: "Entre com email válido" });
    }

    next();

  } catch (error) {
    console.error("Erro ao buscar emails:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
}

export default buscarEmails;