import { describe, it, expect, vi } from "vitest";

vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import buscarFuncionarios from "../../../src/controller/buscarFuncionarios.js";

describe("buscarFuncionarios", () => {
  it("deve retornar lista de funcionários", async () => {
    const req = {
      query: { termo: "João" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ nome: "João" }];

    db.query.mockResolvedValue([mockData]);

    await buscarFuncionarios(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});