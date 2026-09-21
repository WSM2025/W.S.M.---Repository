import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO (ANTES DO IMPORT)
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import baixaProduto from "../../../src/controller/baixaProduto.js";

describe("baixaProduto", () => {

  it("deve realizar baixa com sucesso", async () => {
    const req = {
      params: { id: "1" },
      body: {
        dataBaixa: "2025-01-01",
        quantidade: 2,
        desconto: 0,
        formaPagamento: "PIX",
        observacao: "Teste",
        valorTotal: 100
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 sequência de respostas do banco
    db.query
      .mockResolvedValueOnce([[{ PRO_QtAtual: 10 }]]) // SELECT produto
      .mockResolvedValueOnce([]) // UPDATE estoque
      .mockResolvedValueOnce([{ insertId: 1 }]) // INSERT serviço
      .mockResolvedValueOnce([]); // INSERT relação

    await baixaProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Baixa realizada e serviço registrado com sucesso!"
    });
  });

  it("deve retornar 404 se produto não existir", async () => {
    const req = {
      params: { id: "1" },
      body: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockResolvedValueOnce([[]]); // nenhum produto

    await baixaProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto não encontrado."
    });
  });

  it("deve retornar 400 se quantidade for maior que estoque", async () => {
    const req = {
      params: { id: "1" },
      body: {
        quantidade: 20
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockResolvedValueOnce([[{ PRO_QtAtual: 10 }]]);

    await baixaProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Quantidade de baixa maior que estoque disponível."
    });
  });

  it("deve retornar 500 em caso de erro", async () => {
    const req = {
      params: { id: "1" },
      body: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockRejectedValue(new Error("Erro no banco"));

    await baixaProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao dar baixa no produto."
    });
  });

});