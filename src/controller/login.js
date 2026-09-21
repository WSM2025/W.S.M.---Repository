import db from "../conexao.js";

async function login(req, res) {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ error: "Código e senha são obrigatórios" });
  }

  try {
    const [rows] = await db.query(
      `SELECT FUN_Codigo, FUN_Nome, FUN_Senha, FUN_Nivel, FUN_DtNasc 
       FROM TBL_Funcionario 
       WHERE FUN_Codigo = ?`,
      [cpf]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const funcionario = rows[0];

    if (String(funcionario.FUN_Senha) !== String(senha)) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    return res.status(200).json({
      codigo: funcionario.FUN_Codigo,
      nome: funcionario.FUN_Nome,
      nivel: funcionario.FUN_Nivel,
      nascimento: funcionario.FUN_DtNasc,
      message: "Login bem-sucedido",
    });

  } catch (err) {
    console.error("Erro ao efetuar login:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export default login;