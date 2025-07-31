import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Deve ser possível buscar o perfil de um usuário na aplicação", async () => {
    await request(app.server).post("/users").send({
      name: "Lucas",
      email: "teste@gmail.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/auth").send({
      email: "teste@gmail.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: "teste@gmail.com",
      })
    );
  });
});
