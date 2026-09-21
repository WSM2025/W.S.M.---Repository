import pool from "../conexao.js";

const listarFornecedores = async (req, res) => {
  try {
    console.log("🔄 Buscando fornecedores...");

    const [fornecedores] = await pool.query(`
      SELECT 
        FOR_ID as id,
        FOR_Nome as nome, 
        FOR_Tipo as tipo,
        FOR_Ativo as ativo
      FROM tbl_fornecedor
      ORDER BY FOR_ID ASC
    `);

    console.log(`✅ ${fornecedores.length} fornecedores encontrados`);

    return res.status(200).json(fornecedores);

  } catch (error) {
    console.error("❌ Erro ao listar fornecedores:", error);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

export default listarFornecedores;