import { describe, it, expect, vi } from "vitest";

vi.mock("../../../src/conexao.js", () => ({
  default: {
    query: vi.fn()
  }
}));

import db from "../../../src/conexao.js";
import deletarFuncionario from "../../../src/controller/deletarFuncionario.js";

describe("deletarFuncionario", () => {
  it("deve deletar funcionário com sucesso", async () => {
    const req = {
      params: { id: "1" }
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.query.mockResolvedValue([{ affectedRows: 1 }]);

    await deletarFuncionario(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});