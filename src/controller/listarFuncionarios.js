import db from "../conexao.js";

async function listarFuncionarios(req, res) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tbl_funcionario ORDER BY FUN_Codigo ASC"
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Erro ao listar funcionarios:", err);
    return res.status(500).json({ error: "Erro ao listar funcionarios" });
  }
}

export default listarFuncionarios; 