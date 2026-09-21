import db from "../conexao.js";

async function cadastrarFuncionario(req, res) {
  const { nome, endereco, dtNasc, senha, nivel } = req.body;

  if (!nome || !endereco || !dtNasc || !senha || nivel === undefined) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    await db.query(
      `INSERT INTO TBL_Funcionario (FUN_Nome, FUN_Endereco, FUN_DtNasc, FUN_Senha, FUN_Nivel)
       VALUES (?, ?, ?, ?, ?)`,
      [nome, endereco, dtNasc, senha, nivel]
    );

    return res.status(201).json({ message: "Funcionário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar funcionário:", err);
    return res.status(500).json({ error: "Erro ao cadastrar funcionário." });
  }
}

export default cadastrarFuncionario;