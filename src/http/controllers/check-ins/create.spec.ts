import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test";

describe("Create CheckIn (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Deve ser possível criar um check in na aplicação", async () => {
    const { token } = await createAndAuthUser(app);

    const responseGym = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academiazona",
        description: "",
        phone: "",
        latitude: -22.4445821,
        longitude: -43.1717814,
      });

    const gym = responseGym.body.gym;

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -22.4445821,
        longitude: -43.1717814,
      });

    expect(response.statusCode).toEqual(201);
  });
});
