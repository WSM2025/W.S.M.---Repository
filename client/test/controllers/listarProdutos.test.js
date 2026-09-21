import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import listarOuBuscarProdutos from "../../../src/controller/listarProdutos.js";

describe("listarOuBuscarProdutos", () => {

  it("deve listar todos os produtos sem filtros", async () => {
    const req = {
      query: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_ID: 1, PRO_Descricao: "Produto A" }];

    db.query.mockResolvedValue([mockData]);

    await listarOuBuscarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve filtrar por termo", async () => {
    const req = {
      query: { termo: "Produto" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_ID: 2, PRO_Descricao: "Produto B" }];

    db.query.mockResolvedValue([mockData]);

    await listarOuBuscarProdutos(req, res);

    expect(db.query).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve filtrar por categoria e quantidade", async () => {
    const req = {
      query: {
        categoria: "Eletrônico",
        qtAtual: "10"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_ID: 3, PRO_Descricao: "TV" }];

    db.query.mockResolvedValue([mockData]);

    await listarOuBuscarProdutos(req, res);

    expect(db.query).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve retornar 500 em caso de erro", async () => {
    const req = {
      query: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockRejectedValueOnce(new Error("Erro no banco"));

    await listarOuBuscarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar produtos."
    });
  });

});