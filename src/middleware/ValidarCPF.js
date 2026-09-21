const validarCPF = (req, res, next) => {
  let { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({ mensagem: "Campo CPF é obrigatório" });
  }

  // Remover caracteres não numéricos
  cpf = String(cpf).replace(/\D/g, "");

  // Verifica tamanho
  if (cpf.length !== 11) {
    return res.status(400).json({ mensagem: "Entre com 11 dígitos do CPF" });
  }

  // Correção 1: variáveis agora internas
  let result = 0;
  let countCPF = 0;

  // Primeiro dígito verificador
  for (let index = 10; index > 1; index--) {
    let Consultarcpf = Number(cpf[countCPF]);
    result = Consultarcpf * index + result;
    countCPF++;
  }

  result = (result * 10) % 11;

  if (result !== Number(cpf[9])) {
    return res.status(400).json({ mensagem: "Entre com CPF válido" });
  }

  // Segundo dígito
  result = 0;
  countCPF = 0;

  for (let index = 11; index > 1; index--) {
    let Consultarcpf = Number(cpf[countCPF]);
    result = Consultarcpf * index + result;
    countCPF++;
  }

  result = (result * 10) % 11;

  if (result !== Number(cpf[10])) {
    return res.status(400).json({ mensagem: "Entre com CPF válido" });
  }

  next();
};

export default validarCPF;