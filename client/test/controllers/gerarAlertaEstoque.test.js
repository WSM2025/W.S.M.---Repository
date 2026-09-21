import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO (ANTES DO IMPORT)
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import gerarAlertasEstoque from "../../../src/controller/gerarAlertaEstoque.js";

describe("gerarAlertasEstoque", () => {

  it("deve retornar alertas de estoque baixo/esgotado", async () => {
    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [
      { tipo: "Esgotado", categoria: "Eletrônicos", data: "21/04" },
      { tipo: "Baixo", categoria: "Roupas", data: "21/04" },
      { tipo: null, categoria: "Outros", data: "21/04" } // deve ser filtrado
    ];

    pool.query.mockResolvedValue([mockData]);

    await gerarAlertasEstoque(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { tipo: "Esgotado", categoria: "Eletrônicos", data: "21/04" },
      { tipo: "Baixo", categoria: "Roupas", data: "21/04" }
    ]);
  });

  it("deve retornar lista vazia se não houver alertas válidos", async () => {
    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [
      { tipo: null, categoria: "Categoria A", data: "21/04" }
    ];

    pool.query.mockResolvedValue([mockData]);

    await gerarAlertasEstoque(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("deve retornar 500 em caso de erro", async () => {
    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    pool.query.mockRejectedValue(new Error("Erro no banco"));

    await gerarAlertasEstoque(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Erro ao gerar alertas de estoque"
    });
  });

});