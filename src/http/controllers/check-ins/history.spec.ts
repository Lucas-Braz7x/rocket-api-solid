import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test";
import { prisma } from "@/lib/prisma";

describe("History CheckIns (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Deve ser possível criar um check in na aplicação", async () => {
    const { token } = await createAndAuthUser(app, "ADMIN");

    const user = await prisma.user.findFirstOrThrow();

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

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    });

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
    ]);
  });
});
