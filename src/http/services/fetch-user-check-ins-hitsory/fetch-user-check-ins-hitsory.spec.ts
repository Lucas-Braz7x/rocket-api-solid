import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-check-in.repository";
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-hitsory.service";

let inMemoryCheckInDatabaseRepository: InMemoryCheckInDatabaseRepository;
let sut: FetchUserCheckInsHistoryService;

describe("Fetch check-in user Service", () => {
  beforeEach(async () => {
    inMemoryCheckInDatabaseRepository = new InMemoryCheckInDatabaseRepository();
    sut = new FetchUserCheckInsHistoryService(
      inMemoryCheckInDatabaseRepository
    );
  });

  it("Deve ser possível listar o histórico de check-ins de um usuário", async () => {
    await inMemoryCheckInDatabaseRepository.create({
      gym_id: "01",
      user_id: "teste",
    });

    await inMemoryCheckInDatabaseRepository.create({
      gym_id: "02",
      user_id: "teste",
    });

    const { checkIns } = await sut.handle({
      userId: "teste",
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "01" }),
      expect.objectContaining({ gym_id: "02" }),
    ]);
  });

  it("Deve ser possível listar o histórico de check-ins de um usuário por página", async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryCheckInDatabaseRepository.create({
        gym_id: "gym-" + index,
        user_id: "teste",
      });
    }

    const { checkIns } = await sut.handle({
      userId: "teste",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
