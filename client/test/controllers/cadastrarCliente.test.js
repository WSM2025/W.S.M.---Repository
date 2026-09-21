import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO (ANTES DO IMPORT)
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import cadastrarCliente from "../../../src/controller/cadastrarCliente.js";

describe("cadastrarCliente", () => {
  it("deve cadastrar cliente com sucesso", async () => {
    const req = {
      body: {
        cpf: "123",
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

    // 🔥 MOCK DO INSERT (não retorna nada relevante)
    pool.query.mockResolvedValueOnce([]);

    // 🔥 MOCK DO SELECT (retorna o cliente criado)
    pool.query.mockResolvedValueOnce([
      [
        {
          CLI_CPF: "123",
          CLI_Nome: "João",
          CLI_Fone: "9999",
          CLI_Email: "teste@email.com",
          CLI_Endereco: "Rua A"
        }
      ]
    ]);

    await cadastrarCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      CLI_CPF: "123",
      CLI_Nome: "João",
      CLI_Fone: "9999",
      CLI_Email: "teste@email.com",
      CLI_Endereco: "Rua A"
    });
  });
});