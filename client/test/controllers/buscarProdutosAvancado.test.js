import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import buscarProdutosAvancado from "../../../src/controller/buscarProdutosAvancado.js";

describe("buscarProdutosAvancado", () => {

  it("deve buscar produtos sem filtros", async () => {
    const req = { query: {} };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_ID: 1 }];

    db.query.mockResolvedValue([mockData]);

    await buscarProdutosAvancado(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve aplicar filtro por termo", async () => {
    const req = { query: { termo: "Mouse" } };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_Descricao: "Mouse Gamer" }];

    db.query.mockResolvedValue([mockData]);

    await buscarProdutosAvancado(req, res);

    expect(db.query).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve aplicar filtro por categoria", async () => {
    const req = { query: { categoria: "Eletrônicos" } };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_Categoria: "Eletrônicos" }];

    db.query.mockResolvedValue([mockData]);

    await buscarProdutosAvancado(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve aplicar filtro por quantidade", async () => {
    const req = { query: { qtAtual: 10 } };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_QtAtual: 10 }];

    db.query.mockResolvedValue([mockData]);

    await buscarProdutosAvancado(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve aplicar múltiplos filtros", async () => {
    const req = {
      query: {
        termo: "Teclado",
        categoria: "Periféricos",
        qtAtual: 5
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ PRO_Descricao: "Teclado Mecânico" }];

    db.query.mockResolvedValue([mockData]);

    await buscarProdutosAvancado(req, res);

    expect(db.query).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve retornar 500 em caso de erro", async () => {
    const req = { query: { termo: "Teste" } };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockRejectedValue(new Error("Erro no banco"));

    await buscarProdutosAvancado(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar produtos."
    });
  });

});