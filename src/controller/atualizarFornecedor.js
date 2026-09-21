import pool from "../conexao.js";

const atualizarFornecedor = async (req, res) => {
  console.log("📥 Dados recebidos para atualização fornecedor:", req.params, req.body);
  
  const { id } = req.params;
  const { nome, tipo, ativo } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  try {
    const fornecedorId = parseInt(id);

    console.log("🔄 Atualizando fornecedor ID:", fornecedorId);

    const [result] = await pool.query(
      `UPDATE tbl_fornecedor 
       SET FOR_Nome = ?, FOR_Tipo = ?, FOR_Ativo = ?
       WHERE FOR_ID = ?`,
      [nome, tipo, ativo || "S", fornecedorId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Fornecedor não encontrado" });
    }

    console.log("✅ Fornecedor atualizado!");
    return res.json({ mensagem: "Fornecedor atualizado com sucesso!" });

  } catch (error) {
    console.error("❌ Erro ao atualizar fornecedor:", error);
    return res.status(500).json({
      erro: "Erro interno do servidor",
      detalhe: error.message
    });
  }
};

export default atualizarFornecedor;