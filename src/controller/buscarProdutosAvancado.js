import db from "../conexao.js";

async function buscarProdutosAvancado(req, res) {
  try {
    const { termo, categoria, qtAtual } = req.query;

    let sql = "SELECT * FROM tbl_produto";
    const filtros = [];
    const valores = [];

    if (termo) {
      filtros.push("(PRO_ID LIKE ? OR PRO_Descricao LIKE ?)");
      valores.push(`%${termo}%`, `%${termo}%`);
    }

    if (categoria) {
      filtros.push("PRO_Categoria LIKE ?");
      valores.push(`%${categoria}%`);
    }

    if (qtAtual) {
      filtros.push("PRO_QtAtual = ?");
      valores.push(qtAtual);
    }

    if (filtros.length > 0) {
      sql += " WHERE " + filtros.join(" AND ");
    }

    sql += " ORDER BY PRO_ID ASC";

    const [rows] = await db.query(sql, valores);
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    return res.status(500).json({ error: "Erro ao buscar produtos." });
  }
}

export default buscarProdutosAvancado;