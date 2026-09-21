import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import deletarCliente from "../../../src/controller/deletarCliente.js";

describe("deletarCliente", () => {

  it("deve deletar cliente com sucesso", async () => {
    const req = {
      params: { cpf: "123" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 simula sucesso
    pool.query.mockResolvedValue([{ affectedRows: 1 }]);

    await deletarCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Cliente excluído!"
    });
  });

  it("deve retornar 404 quando cliente não existir", async () => {
    const req = {
      params: { cpf: "999" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 nenhum registro afetado
    pool.query.mockResolvedValue([{ affectedRows: 0 }]);

    await deletarCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Cliente não encontrado"
    });
  });

});