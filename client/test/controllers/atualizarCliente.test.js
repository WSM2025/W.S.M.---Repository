import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO (ANTES DO IMPORT)
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import atualizarCliente from "../../../src/controller/atualizarCliente.js";

describe("atualizarCliente", () => {
  it("deve atualizar cliente com sucesso", async () => {
    const req = {
      params: { cpf: "123" },
      body: {
        nome: "João",
        telefone: "9999",
        email: "teste@email.com",
        endereco: "Rua A"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 SIMULA SUCESSO NO BANCO
    pool.query.mockResolvedValue([{ affectedRows: 1 }]);

    await atualizarCliente(req, res);

    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Cliente atualizado com sucesso!"
    });
  });
});