import { describe, it, expect, vi } from "vitest";

vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import listarFuncionarios from "../../../src/controller/listarFuncionarios.js";

describe("listarFuncionarios", () => {
  it("deve listar funcionários", async () => {
    const req = {};

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockData = [{ nome: "Maria" }];

    db.query.mockResolvedValue([mockData]);

    await listarFuncionarios(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});