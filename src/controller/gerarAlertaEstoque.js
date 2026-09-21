import pool from "../conexao.js";

const gerarAlertasEstoque = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        CASE 
          WHEN PRO_QtAtual = 0 THEN 'Esgotado'
          WHEN PRO_QtAtual < 10 THEN 'Baixo'
          ELSE NULL
        END AS tipo,
        PRO_Categoria AS categoria,
        DATE_FORMAT(NOW(), '%d/%m') AS data
      FROM tbl_produto
      WHERE PRO_QtAtual < 10
    `);

    const alertas = rows.filter(a => a.tipo !== null);

    return res.status(200).json(alertas);

  } catch (error) {
    console.error("Erro ao gerar alertas:", error.message);

    return res.status(500).json({
      mensagem: "Erro ao gerar alertas de estoque"
    });
  }
};

export default gerarAlertasEstoque;