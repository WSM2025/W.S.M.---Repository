import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO (ANTES DO IMPORT)
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import deletarProduto from "../../../src/controller/deletarProduto.js";

describe("deletarProduto", () => {

  it("deve deletar produto com sucesso", async () => {
    const req = {
      params: { id: "1" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query
      .mockResolvedValueOnce() // START TRANSACTION
      .mockResolvedValueOnce() // DELETE tbl_proped
      .mockResolvedValueOnce() // DELETE tbl_profor
      .mockResolvedValueOnce() // DELETE tbl_estoque
      .mockResolvedValueOnce([{ affectedRows: 1 }]) // DELETE produto
      .mockResolvedValueOnce(); // COMMIT

    await deletarProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto e dependências deletados com sucesso!",
    });
  });

  it("deve retornar 404 quando produto não existe", async () => {
    const req = {
      params: { id: "999" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query
      .mockResolvedValueOnce() // START TRANSACTION
      .mockResolvedValueOnce()
      .mockResolvedValueOnce()
      .mockResolvedValueOnce()
      .mockResolvedValueOnce([{ affectedRows: 0 }]) // DELETE produto falhou
      .mockResolvedValueOnce(); // ROLLBACK

    await deletarProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto não encontrado."
    });
  });

  it("deve retornar 500 em caso de erro", async () => {
    const req = {
      params: { id: "1" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 CORREÇÃO AQUI
    db.query
      .mockResolvedValueOnce() // START TRANSACTION ok
      .mockRejectedValueOnce(new Error("Erro no banco")) // falha aqui
      .mockResolvedValueOnce(); // ROLLBACK funciona

    await deletarProduto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao deletar produto."
    });
  });

});