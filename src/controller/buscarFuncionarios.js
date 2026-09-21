import db from "../conexao.js";

async function buscarFuncionarios(req, res) {
  const { termo } = req.query;

  try {
    const [rows] = await db.query(
      `SELECT * FROM TBL_Funcionario 
       WHERE FUN_Nome LIKE ? OR FUN_Codigo = ?`,
      [`%${termo}%`, Number(termo) || 0]
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Erro ao buscar funcionários:", err);
    return res.status(500).json({ error: "Erro ao buscar funcionários." });
  }
}

export default buscarFuncionarios;