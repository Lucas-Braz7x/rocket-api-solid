import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test";

describe("Nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Deve ser possível pesquisar academias próximas na aplicação", async () => {
    const { token } = await createAndAuthUser(app, "ADMIN");

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia próxima",
        description: "",
        phone: "",
        latitude: -22.4445821,
        longitude: -43.1717814,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia longe",
        description: "",
        phone: "",
        latitude: -22.4104023,
        longitude: -43.3998306,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -22.4502602,
        longitude: -43.1655207,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "Academia próxima" }),
    ]);
  });
});
