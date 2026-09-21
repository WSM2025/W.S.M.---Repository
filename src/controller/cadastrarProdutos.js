import db from "../conexao.js";

async function cadastrarProdutos(req, res) {
  const conn = db;
  const { descricao, valor, qtEntrada, categoria } = req.body;

  if (!descricao || !valor || !qtEntrada || !categoria) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // 1️⃣ Cadastra produto
    const [result] = await conn.query(
      `INSERT INTO TBL_Produto 
       (PRO_Descricao, PRO_Valor, PRO_Quantidade, PRO_QtAtual, PRO_Categoria)
       VALUES (?, ?, 0, ?, ?)`,
      [descricao, valor, qtEntrada, categoria]
    );

    const produtoId = result.insertId;

    // 2️⃣ Registra entrada no estoque
    await conn.query(
      `INSERT INTO TBL_Estoque (EST_QtEntrada, EST_DataEntrada, PRO_ID)
       VALUES (?, NOW(), ?)`,
      [qtEntrada, produtoId]
    );

    return res.status(201).json({
      message: "Produto cadastrado com sucesso (QtAtual = qtEntrada)!"
    });

  } catch (err) {
    console.error("Erro no cadastro:", err);
    return res.status(500).json({ error: "Erro ao cadastrar produto" });
  }
}

export default cadastrarProdutos;