const validateDate = (req, res, next) => {
  // Captura o campo de data independentemente do nome usado no frontend
  const data =
    req.body.data ||
    req.body.dtNasc ||
    req.body.FUN_DtNasc; // compatível com o banco

  // Verifica se a data foi enviada
  if (!data) {
    return res.status(400).json({ mensagem: "Data de nascimento não informada." });
  }

  // Verifica se o formato é válido (YYYY-MM-DD)
  const regexData = /^\d{4}-\d{2}-\d{2}$/;
  if (!regexData.test(data)) {
    return res.status(400).json({ mensagem: "Formato de data inválido. Use YYYY-MM-DD." });
  }

  // Pega o ano de nascimento
  const anoNascimento = Number(data.slice(0, 4));
  const anoAtual = new Date().getFullYear();

  // Calcula a idade e valida
  const idade = anoAtual - anoNascimento;

  if (idade < 15 || idade > 120) {
    return res.status(400).json({ mensagem: "Idade não permitida." });
  }

  next(); // Se passou em tudo, segue o fluxo
};

export default validateDate;