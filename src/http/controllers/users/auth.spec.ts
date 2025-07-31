import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Auth (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Deve ser possível se autenticar na aplicação", async () => {
    await request(app.server).post("/users").send({
      name: "Lucas",
      email: "teste@gmail.com",
      password: "123456",
    });

    const response = await request(app.server).post("/auth").send({
      email: "teste@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
