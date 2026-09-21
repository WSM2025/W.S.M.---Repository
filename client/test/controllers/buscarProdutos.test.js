import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import buscarProdutos from "../../../src/controller/buscarProdutos.js";

describe("buscarProdutos", () => {

  it("deve retornar produtos quando encontrar resultado (termo texto)", async () => {
    const req = {
      query: { termo: "Notebook" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_Descricao: "Notebook Dell" }];

    db.query.mockResolvedValue([mockData]);

    await buscarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve retornar produtos quando termo for numérico", async () => {
    const req = {
      query: { termo: "1" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_ID: 1, PRO_Descricao: "Mouse" }];

    db.query.mockResolvedValue([mockData]);

    await buscarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve retornar 400 se termo não for informado", async () => {
    const req = {
      query: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await buscarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Termo de busca não informado."
    });
  });

  it("deve retornar 404 quando não encontrar produtos", async () => {
    const req = {
      query: { termo: "Inexistente" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockResolvedValue([[]]);

    await buscarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Nenhum produto encontrado."
    });
  });

  it("deve retornar 500 em caso de erro", async () => {
    const req = {
      query: { termo: "Teste" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockRejectedValue(new Error("Erro no banco"));

    await buscarProdutos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar produto."
    });
  });

});