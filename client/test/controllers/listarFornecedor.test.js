import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import listarFornecedores from "../../../src/controller/listarFornecedores.js";

describe("listarFornecedores", () => {

  it("deve listar fornecedores com sucesso", async () => {
    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [
      { id: 1, nome: "Fornecedor A", tipo: "Alimentos", ativo: "S" },
      { id: 2, nome: "Fornecedor B", tipo: "Serviço", ativo: "N" }
    ];

    pool.query.mockResolvedValue([mockData]);

    await listarFornecedores(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("deve retornar lista vazia quando não houver fornecedores", async () => {
    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    pool.query.mockResolvedValue([[]]);

    await listarFornecedores(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("deve retornar erro 500 em caso de falha", async () => {
    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    pool.query.mockRejectedValue(new Error("Erro no banco"));

    await listarFornecedores(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Erro interno do servidor"
    });
  });

});