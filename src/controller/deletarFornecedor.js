import pool from "../conexao.js";

const deletarFornecedor = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ erro: "ID não informado" });
  }

  try {
    const fornecedorId = parseInt(id);

    const [result] = await pool.query(
      `DELETE FROM tbl_fornecedor WHERE FOR_ID = ?`,
      [fornecedorId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Fornecedor não encontrado" });
    }

    return res.status(200).json({ mensagem: "Fornecedor excluído com sucesso!" });

  } catch (error) {
    console.error("Erro ao excluir fornecedor:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        erro: "Fornecedor não pode ser excluído pois está vinculado a outros registros"
      });
    }

    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export default deletarFornecedor;