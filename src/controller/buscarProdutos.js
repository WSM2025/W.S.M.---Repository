import db from "../conexao.js";

async function buscarProdutos(req, res) {
  const conn = db;
  const { termo } = req.query;

  if (!termo) {
    return res.status(400).json({ error: "Termo de busca não informado." });
  }

  try {
    let sql;
    let params;

    if (!isNaN(termo)) {
      sql = `
        SELECT * FROM TBL_Produto
        WHERE PRO_ID = ? OR PRO_Descricao LIKE ?
      `;
      params = [Number(termo), `%${termo}%`];
    } else {
      sql = `
        SELECT * FROM TBL_Produto
        WHERE PRO_Descricao LIKE ?
      `;
      params = [`%${termo}%`];
    }

    const [rows] = await conn.query(sql, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado." });
    }

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    return res.status(500).json({ error: "Erro ao buscar produto." });
  }
}

export default buscarProdutos;