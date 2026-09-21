import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import cadastrarProdutos from "../../../src/controller/cadastrarProdutos.js";

describe("cadastrarProdutos", () => {

  it("deve cadastrar produto com sucesso", async () => {
    const req = {
      body: {
        descricao: "Notebook",
        valor: 2500,
        qtEntrada: 10,
        categoria: "Eletrônicos"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 fluxo de queries
    db.query
      .mockResolvedValueOnce([{ insertId: 1 }]) // INSERT produto
      .mockResolvedValueOnce([]); // INSERT estoque

    await cadastrarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto cadastrado com sucesso (QtAtual = qtEntrada)!"
    });
  });

  it("deve retornar 400 se faltar campos obrigatórios", async () => {
    const req = {
      body: {
        descricao: "Notebook"
        // faltando campos
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await cadastrarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Todos os campos são obrigatórios"
    });
  });

  it("deve retornar 500 em caso de erro no banco", async () => {
    const req = {
      body: {
        descricao: "Notebook",
        valor: 2500,
        qtEntrada: 10,
        categoria: "Eletrônicos"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockRejectedValue(new Error("Erro no banco"));

    await cadastrarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao cadastrar produto"
    });
  });

});