import db from "../conexao.js";

async function atualizarProduto(req, res) {
  const conn = db;
  const { id } = req.params;
  const { PRO_Descricao, PRO_Valor, PRO_QtAtual, PRO_Categoria } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID do produto não informado." });
  }

  try {
    const [result] = await conn.query(
      `UPDATE TBL_Produto
       SET PRO_Descricao = ?, PRO_Valor = ?, PRO_QtAtual = ?, PRO_Categoria = ?
       WHERE PRO_ID = ?`,
      [PRO_Descricao, PRO_Valor, PRO_QtAtual, PRO_Categoria, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    return res.status(200).json({ message: "Produto atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    return res.status(500).json({ error: "Erro ao atualizar produto." });
  }
}

export default atualizarProduto;