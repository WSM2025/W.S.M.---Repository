import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import login from "../../../src/controller/login.js";

describe("login", () => {

  it("deve realizar login com sucesso", async () => {
    const req = {
      body: {
        cpf: "1",
        senha: "123"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockUser = [{
      FUN_Codigo: 1,
      FUN_Nome: "João",
      FUN_Senha: "123",
      FUN_Nivel: 2,
      FUN_DtNasc: "2000-01-01"
    }];

    db.query.mockResolvedValue([mockUser]);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      codigo: 1,
      nome: "João",
      nivel: 2,
      nascimento: "2000-01-01",
      message: "Login bem-sucedido",
    });
  });

  it("deve retornar 400 se cpf ou senha não forem informados", async () => {
    const req = {
      body: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Código e senha são obrigatórios"
    });
  });

  it("deve retornar 401 se usuário não existir", async () => {
    const req = {
      body: {
        cpf: "999",
        senha: "123"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockResolvedValue([[]]);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Usuário não encontrado"
    });
  });

  it("deve retornar 401 se senha estiver incorreta", async () => {
    const req = {
      body: {
        cpf: "1",
        senha: "errada"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockUser = [{
      FUN_Codigo: 1,
      FUN_Nome: "João",
      FUN_Senha: "123",
      FUN_Nivel: 2,
      FUN_DtNasc: "2000-01-01"
    }];

    db.query.mockResolvedValue([mockUser]);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Senha incorreta"
    });
  });

  it("deve retornar 500 em caso de erro no banco", async () => {
    const req = {
      body: {
        cpf: "1",
        senha: "123"
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockRejectedValueOnce(new Error("Erro no banco"));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro interno no servidor"
    });
  });

});