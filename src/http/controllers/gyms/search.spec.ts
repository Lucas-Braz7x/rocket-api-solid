import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test";

describe("Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Deve ser possível pesquisar academias na aplicação", async () => {
    const { token } = await createAndAuthUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academiazona",
        description: "",
        phone: "",
        latitude: -22.4327836,
        longitude: -43.138504,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Teste 2",
        description: "",
        phone: "",
        latitude: -22.4327836,
        longitude: -43.138504,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "Teste",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Teste 2",
      }),
    ]);
  });
});
