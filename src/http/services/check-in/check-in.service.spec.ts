import { CheckInService } from "./check-in.service";
import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/config/errors";
import { InMemoryCheckInDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-check-in.repository";

let inMemoryCheckInDatabaseRepository: InMemoryCheckInDatabaseRepository;

let sut: CheckInService;

describe("CheckIn Use Service", () => {
  beforeEach(() => {
    inMemoryCheckInDatabaseRepository = new InMemoryCheckInDatabaseRepository();

    sut = new CheckInService(inMemoryCheckInDatabaseRepository);
  });

  it("Deve ser possível um usuário realizar check in", async () => {
    const { checkIn } = await sut.handle({
      userId: "teste",
      gymId: "teste",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
