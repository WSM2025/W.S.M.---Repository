import db from "../conexao.js";

async function listarOuBuscarClientes(req, res) {
  try {
    const { termo } = req.query;

    let sql = `
      SELECT 
        CLI_CPF AS cpf,
        CLI_Fone AS telefone,
        CLI_Nome AS nome,
        CLI_Email AS email,
        CLI_Endereco AS endereco
      FROM tbl_cliente
    `;

    const valores = [];

    if (termo) {
      sql += `
        WHERE 
          CLI_CPF LIKE ? OR 
          CLI_Nome LIKE ? OR 
          CLI_Email LIKE ?
      `;
      valores.push(`%${termo}%`, `%${termo}%`, `%${termo}%`);
    }

    sql += ` ORDER BY CLI_CPF ASC`;

    const [rows] = await db.query(sql, valores);
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    return res.status(500).json({ error: "Erro ao buscar clientes." });
  }
}

export default listarOuBuscarClientes;