import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO (ANTES DO IMPORT)
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import atualizarProduto from "../../../src/controller/atualizarProduto.js";

describe("atualizarProduto", () => {
  
  it("deve atualizar produto com sucesso", async () => {
    const req = {
      params: { id: "1" },
      body: {
        PRO_Descricao: "Produto Teste",
        PRO_Valor: 100,
        PRO_QtAtual: 10,
        PRO_Categoria: "Categoria A"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 simula sucesso no banco
    db.query.mockResolvedValue([{ affectedRows: 1 }]);

    await atualizarProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto atualizado com sucesso!"
    });
  });

  it("deve retornar 400 se ID não for informado", async () => {
    const req = {
      params: {},
      body: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await atualizarProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "ID do produto não informado."
    });
  });

  it("deve retornar 404 se produto não existir", async () => {
    const req = {
      params: { id: "999" },
      body: {
        PRO_Descricao: "Produto Teste",
        PRO_Valor: 100,
        PRO_QtAtual: 10,
        PRO_Categoria: "Categoria A"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockResolvedValue([{ affectedRows: 0 }]);

    await atualizarProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto não encontrado."
    });
  });

  it("deve retornar 500 em caso de erro", async () => {
    const req = {
      params: { id: "1" },
      body: {
        PRO_Descricao: "Produto Teste",
        PRO_Valor: 100,
        PRO_QtAtual: 10,
        PRO_Categoria: "Categoria A"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockRejectedValue(new Error("Erro no banco"));

    await atualizarProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao atualizar produto."
    });
  });

});