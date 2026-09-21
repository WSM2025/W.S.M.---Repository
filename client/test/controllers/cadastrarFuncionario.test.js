import { describe, it, expect, vi } from "vitest";

vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import cadastrarFuncionario from "../../../src/controller/cadastrarFuncionario.js";

describe("cadastrarFuncionario", () => {
  it("deve cadastrar funcionário com sucesso", async () => {
    const req = {
      body: {
        nome: "João",
        endereco: "Rua A",
        dtNasc: "2000-01-01",
        senha: "123",
        nivel: 1
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockResolvedValue([]);

    await cadastrarFuncionario(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});