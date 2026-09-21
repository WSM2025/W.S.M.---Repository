import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import deletarFornecedor from "../../../src/controller/deletarFornecedor.js";

describe("deletarFornecedor", () => {

  it("deve deletar fornecedor com sucesso", async () => {
    const req = {
      params: { id: "1" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    pool.query.mockResolvedValue([{ affectedRows: 1 }]);

    await deletarFornecedor(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Fornecedor excluído com sucesso!"
    });
  });

  it("deve retornar 404 quando fornecedor não existir", async () => {
    const req = {
      params: { id: "999" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    pool.query.mockResolvedValue([{ affectedRows: 0 }]);

    await deletarFornecedor(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Fornecedor não encontrado"
    });
  });

  it("deve retornar 400 quando ID não for informado", async () => {
    const req = {
      params: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await deletarFornecedor(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: "ID não informado"
    });
  });

  it("deve retornar erro de vínculo (constraint)", async () => {
    const req = {
      params: { id: "1" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 simula erro de FK
    pool.query.mockRejectedValue({
      code: "ER_ROW_IS_REFERENCED_2"
    });

    await deletarFornecedor(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Fornecedor não pode ser excluído pois está vinculado a outros registros"
    });
  });

});