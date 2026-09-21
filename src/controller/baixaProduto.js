import db from "../conexao.js";

async function baixaProduto(req, res) {
  const conn = db;
  const { id } = req.params;
  const {
    dataBaixa,
    quantidade,
    desconto,
    formaPagamento,
    observacao,
    valorTotal,
  } = req.body;

  try {
    // 1️⃣ Busca o produto
    const [produtoRows] = await conn.query(
      "SELECT * FROM TBL_Produto WHERE PRO_ID = ?",
      [id]
    );

    if (produtoRows.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    const produto = produtoRows[0];
    const novaQtAtual = produto.PRO_QtAtual - quantidade;

    if (novaQtAtual < 0) {
      return res
        .status(400)
        .json({ message: "Quantidade de baixa maior que estoque disponível." });
    }

    // 2️⃣ Atualiza estoque
    await conn.query(
      "UPDATE TBL_Produto SET PRO_QtAtual = ? WHERE PRO_ID = ?",
      [novaQtAtual, id]
    );

    // 3️⃣ Cria serviço
    const [servicoResult] = await conn.query(
      `INSERT INTO TBL_Servico
      (SER_Data, SER_ValorPedido, SER_Desconto, SER_Quantidade, SER_FormaPagamento, SER_Observacao)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [dataBaixa, valorTotal, desconto, quantidade, formaPagamento, observacao]
    );

    const servicoId = servicoResult.insertId;

    // 4️⃣ Relaciona produto ao serviço
    await conn.query(
      `INSERT INTO TBL_ProPed (SER_ID, PRO_ID) VALUES (?, ?)`,
      [servicoId, id]
    );

    return res
      .status(200)
      .json({ message: "Baixa realizada e serviço registrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao dar baixa:", err);
    return res.status(500).json({ error: "Erro ao dar baixa no produto." });
  }
}

export default baixaProduto;