import db from "../conexao.js";

async function deletarFuncionario(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID do funcionário não informado." });
  }

  try {
    const [result] = await db.query(
      `DELETE FROM TBL_Funcionario WHERE FUN_Codigo = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    return res.status(200).json({ message: "Funcionário deletado com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar funcionário:", err);
    return res.status(500).json({ error: "Erro ao deletar funcionário." });
  }
}

export default deletarFuncionario;