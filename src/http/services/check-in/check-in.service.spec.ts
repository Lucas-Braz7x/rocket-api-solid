import { CheckInService } from "./check-in.service";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-check-in.repository";
import { InMemoryGymDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-gym.repository";
import { Decimal } from "@prisma/client/runtime";

let inMemoryCheckInDatabaseRepository: InMemoryCheckInDatabaseRepository;
let inMemoryGymDatabaseRepository: InMemoryGymDatabaseRepository;
let sut: CheckInService;

describe("CheckIn Use Service", () => {
  beforeEach(async () => {
    inMemoryCheckInDatabaseRepository = new InMemoryCheckInDatabaseRepository();
    inMemoryGymDatabaseRepository = new InMemoryGymDatabaseRepository();
    sut = new CheckInService(
      inMemoryCheckInDatabaseRepository,
      inMemoryGymDatabaseRepository
    );

    await inMemoryGymDatabaseRepository.create({
      id: "teste",
      title: "academia",
      description: "",
      phone: "",
      latitude: -22.4327836,
      longitude: -43.138504,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Deve ser possível um usuário realizar check in", async () => {
    const { checkIn } = await sut.handle({
      userId: "teste",
      gymId: "teste",
      userLatitude: -22.4325592,
      userLongitude: -43.137624,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Não Deve ser possível um usuário realizar check in duas vezes no mesmo dia", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.handle({
      userId: "teste",
      gymId: "teste",
      userLatitude: -22.4325592,
      userLongitude: -43.137624,
    });

    await expect(async () =>
      sut.handle({
        userId: "teste",
        gymId: "teste",
        userLatitude: -22.4325592,
        userLongitude: -43.137624,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Deve ser possível um usuário realizar check in em dias diferentes", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.handle({
      userId: "teste",
      gymId: "teste",
      userLatitude: -22.4325592,
      userLongitude: -43.137624,
    });

    vi.setSystemTime(new Date(2025, 0, 25, 8, 0, 0));

    const { checkIn } = await sut.handle({
      userId: "teste",
      gymId: "teste",
      userLatitude: -22.4325592,
      userLongitude: -43.137624,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Não Deve ser possível um usuário realizar check in a uma distância maior do que 100m", async () => {
    inMemoryGymDatabaseRepository.itens.push({
      id: "teste-02",
      title: "academia nova",
      description: "",
      phone: "",
      latitude: new Decimal(-22.4327836),
      longitude: new Decimal(-43.138504),
    });

    await expect(
      sut.handle({
        userId: "teste",
        gymId: "teste-02",
        userLatitude: -22.4615071,
        userLongitude: -43.1447304,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
