import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO (ANTES DO IMPORT)
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import atualizarFuncionario from "../../../src/controller/atualizarFuncionario.js";

describe("atualizarFuncionario", () => {
  it("deve atualizar funcionário com sucesso", async () => {
    const req = {
      params: { id: "1" },
      body: {
        FUN_Nome: "João",
        FUN_Endereco: "Rua A",
        FUN_DtNasc: "2000-01-01",
        FUN_Senha: "123",
        FUN_Nivel: 1
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 SIMULA SUCESSO NO BANCO
    db.query.mockResolvedValue([{ affectedRows: 1 }]);

    await atualizarFuncionario(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Funcionário atualizado com sucesso!"
    });
  });
});