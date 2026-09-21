import pool from "../conexao.js";

async function cadastrarFornecedor(req, res) {
  try {
    const { nome, tipo, ativo } = req.body;

    if (!nome || !tipo) {
      return res.status(400).json({ erro: "Nome e tipo são obrigatórios" });
    }

    const [result] = await pool.query(
      `INSERT INTO tbl_fornecedor 
        (FOR_Nome, FOR_Tipo, FOR_Ativo) 
       VALUES (?, ?, ?)`,
      [nome, tipo, ativo || "S"]
    );

    return res.status(201).json({
      id: result.insertId,
      nome,
      tipo,
      ativo: ativo || "S"
    });

  } catch (error) {
    console.error("Erro ao cadastrar fornecedor:", error);
    return res.status(500).json({ erro: "Erro ao cadastrar fornecedor" });
  }
}

export default cadastrarFornecedor;