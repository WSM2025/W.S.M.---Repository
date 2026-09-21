import db from "../conexao.js";

async function deletarProduto(req, res) {
  const conn = db;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID do produto não informado." });
  }

  try {
    await conn.query("START TRANSACTION");

    await conn.query("DELETE FROM tbl_proped WHERE PRO_ID = ?", [id]);
    await conn.query("DELETE FROM tbl_profor WHERE PRO_ID = ?", [id]);
    await conn.query("DELETE FROM tbl_estoque WHERE PRO_ID = ?", [id]);

    const [result] = await conn.query(
      "DELETE FROM tbl_produto WHERE PRO_ID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      await conn.query("ROLLBACK");
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    await conn.query("COMMIT");

    return res.status(200).json({
      message: "Produto e dependências deletados com sucesso!",
    });

  } catch (err) {
    await conn.query("ROLLBACK");
    console.error("Erro ao deletar produto:", err);
    return res.status(500).json({ error: "Erro ao deletar produto." });
  }
}

export default deletarProduto;