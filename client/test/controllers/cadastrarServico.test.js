import { describe, it, expect, vi } from "vitest";

// 🔥 MOCK DO BANCO
vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import pool from "../../../src/conexao.js";
import cadastrarServico from "../../../src/controller/cadastrarServico.js";

describe("cadastrarServico", () => {

  it("deve cadastrar serviço com sucesso", async () => {
    const req = {
      body: {
        observacao: "Troca de peça",
        data: "2024-01-01",
        valor: 100,
        pagamento: "PIX",
        desconto: 0,
        quantidade: 1,
        cpf: "123",
        fornecedor: 1,
        funcionario: 2,
      }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    // 🔥 Simula insert no banco
    pool.query.mockResolvedValue([{ insertId: 10 }]);

    await cadastrarServico(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 10,
      observacao: "Troca de peça",
      data: "2024-01-01",
      valor: 100,
      pagamento: "PIX",
      desconto: 0,
      quantidade: 1,
      cpf: "123",
      fornecedor: 1,
      funcionario: 2,
    });
  });

  it("deve retornar 500 em caso de erro", async () => {
    const req = {
      body: {}
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    pool.query.mockRejectedValueOnce(new Error("Erro no banco"));

    await cadastrarServico(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Erro ao cadastrar serviço"
    });
  });

});