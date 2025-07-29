import { GetUserMetricsService } from "./metrics.service";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-check-in.repository";

let inMemoryCheckInDatabaseRepository: InMemoryCheckInDatabaseRepository;
let sut: GetUserMetricsService;

describe("Get User metrics Service", () => {
  beforeEach(async () => {
    inMemoryCheckInDatabaseRepository = new InMemoryCheckInDatabaseRepository();
    sut = new GetUserMetricsService(inMemoryCheckInDatabaseRepository);
  });

  it("Deve ser possível listar a quantidade de check-ins de um usuário", async () => {
    await inMemoryCheckInDatabaseRepository.create({
      gym_id: "01",
      user_id: "teste",
    });

    await inMemoryCheckInDatabaseRepository.create({
      gym_id: "02",
      user_id: "teste",
    });

    const { checkInsCount } = await sut.handle({
      userId: "teste",
    });

    expect(checkInsCount).toEqual(2);
  });
});
