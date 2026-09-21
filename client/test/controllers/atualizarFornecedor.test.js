import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import atualizarFornecedor from "../../../src/controller/atualizarFornecedor.js";

describe("atualizarFornecedor", () => {

  it("deve atualizar fornecedor com sucesso", async () => {
    const req = {
      params: { id: "1" },
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

    // 🔥 sucesso no banco
    pool.query.mockResolvedValue([{ affectedRows: 1 }]);

    await atualizarFornecedor(req, res);

    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Fornecedor atualizado com sucesso!"
    });
  });

  it("deve retornar 404 quando fornecedor não existir", async () => {
    const req = {
      params: { id: "999" },
      body: {
        nome: "Fornecedor X",
        tipo: "Serviço",
        ativo: "S"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    pool.query.mockResolvedValue([{ affectedRows: 0 }]);

    await atualizarFornecedor(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Fornecedor não encontrado"
    });
  });

  it("deve retornar 400 quando nome não for informado", async () => {
    const req = {
      params: { id: "1" },
      body: {
        tipo: "Alimentos",
        ativo: "S"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await atualizarFornecedor(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Nome é obrigatório"
    });
  });

});