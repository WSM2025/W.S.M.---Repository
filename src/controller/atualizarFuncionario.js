import db from "../conexao.js";

const atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { FUN_Nome, FUN_Endereco, FUN_DtNasc, FUN_Senha, FUN_Nivel } = req.body;

  if (!id || !FUN_Nome || !FUN_Endereco || !FUN_DtNasc || !FUN_Senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const [result] = await db.query(
      `UPDATE TBL_Funcionario 
       SET FUN_Nome = ?, FUN_Endereco = ?, FUN_DtNasc = ?, FUN_Senha = ?, FUN_Nivel = ? 
       WHERE FUN_Codigo = ?`,
      [FUN_Nome, FUN_Endereco, FUN_DtNasc, FUN_Senha, FUN_Nivel, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    return res.status(200).json({ message: "Funcionário atualizado com sucesso!" });

  } catch (err) {
    console.error("Erro ao atualizar funcionário:", err);
    return res.status(500).json({ error: "Erro ao atualizar funcionário." });
  }
};

export default atualizarFuncionario;