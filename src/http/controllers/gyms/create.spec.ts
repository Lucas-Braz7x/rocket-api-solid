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

  it("Deve ser possível criar uma academia na aplicação", async () => {
    const { token } = await createAndAuthUser(app);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academiazona",
        description: "",
        phone: "",
        latitude: -22.4327836,
        longitude: -43.138504,
      });

    expect(response.statusCode).toEqual(200);
  });
});
