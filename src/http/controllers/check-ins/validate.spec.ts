import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthUser } from "@/utils/test";
import { prisma } from "@/lib/prisma";

describe("Validate CheckIn (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Deve ser possível validar um check in na aplicação", async () => {
    const { token } = await createAndAuthUser(app);

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

    let checkIn = await prisma.checkIn.create({
      data: { gym_id: gym.id, user_id: user.id },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
