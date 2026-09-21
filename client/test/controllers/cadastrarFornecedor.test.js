import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import cadastrarFornecedor from "../../../src/controller/cadastrarFornecedor.js";

describe("cadastrarFornecedor", () => {

  it("deve cadastrar fornecedor com sucesso", async () => {
    const req = {
      body: {
        nome: "Fornecedor A",
        tipo: "Alimentos",
        ativo: "S"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 simula retorno do MySQL
    pool.query.mockResolvedValue([{ insertId: 10 }]);

    await cadastrarFornecedor(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 10,
      nome: "Fornecedor A",
      tipo: "Alimentos",
      ativo: "S"
    });
  });

  it("deve usar ativo padrão quando não informado", async () => {
    const req = {
      body: {
        nome: "Fornecedor B",
        tipo: "Serviço"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    pool.query.mockResolvedValue([{ insertId: 20 }]);

    await cadastrarFornecedor(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 20,
      nome: "Fornecedor B",
      tipo: "Serviço",
      ativo: "S"
    });
  });

  it("deve retornar 400 quando faltar nome ou tipo", async () => {
    const req = {
      body: {
        nome: ""
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await cadastrarFornecedor(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Nome e tipo são obrigatórios"
    });
  });

});