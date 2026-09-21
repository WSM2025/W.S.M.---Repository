import pool from "../conexao.js";

async function cadastrarServico(req, res) {
  try {
    const {
      observacao,
      data,
      valor,
      pagamento,
      desconto,
      quantidade,
      cpf,
      fornecedor,
      funcionario,
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO tbl_servico 
        (SER_Observacao, SER_Data, SER_ValorPedido, SER_FormaPagamento, SER_Desconto, SER_Quantidade, CLI_CPF, FOR_ID, FUN_Codigo) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        observacao,
        data,
        valor,
        pagamento,
        desconto,
        quantidade,
        cpf,
        fornecedor,
        funcionario,
      ]
    );

    return res.status(201).json({
      id: result.insertId,
      observacao,
      data,
      valor,
      pagamento,
      desconto,
      quantidade,
      cpf,
      fornecedor,
      funcionario,
    });

  } catch (error) {
    console.error("Erro ao cadastrar serviço:", error);
    return res.status(500).json({ erro: "Erro ao cadastrar serviço" });
  }
}

export default cadastrarServico;