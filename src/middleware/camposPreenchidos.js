const camposPreenchidos = (req, res, next) => {
  const campos = req.body;

  for (const dado in campos) {
    if (!campos[dado]) {
      return res
        .status(400)
        .json({ mensagem: `Obrigatório preenchimento campo ${dado}` });
    }
  }

  next();
};

export default camposPreenchidos;