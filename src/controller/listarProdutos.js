import db from "../conexao.js";

async function listarOuBuscarProdutos(req, res) {
  try {
    const { termo, categoria, qtAtual } = req.query;

    let sql = "SELECT * FROM tbl_produto";
    const filtros = [];
    const valores = [];

    // 🔍 Filtro por ID ou descrição
    if (termo) {
      filtros.push("(PRO_ID LIKE ? OR PRO_Descricao LIKE ?)");
      valores.push(`%${termo}%`, `%${termo}%`);
    }

    // 🔍 Filtro por categoria
    if (categoria) {
      filtros.push("PRO_Categoria LIKE ?");
      valores.push(`%${categoria}%`);
    }

    // 🔍 Filtro por quantidade atual
    if (qtAtual) {
      filtros.push("PRO_QtAtual <= ?");
      valores.push(Number(qtAtual));
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

export default listarOuBuscarProdutos;