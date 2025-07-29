import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-check-in.repository";
import { ValidateCheckInService } from "./validade-check-in.service";
import { ResourceNotFoundError } from "@/config/errors/resource-not-found";
import { LateCheckInValidationError } from "@/config/errors/late-check-in_validation-error";

let inMemoryCheckInDatabaseRepository: InMemoryCheckInDatabaseRepository;
let sut: ValidateCheckInService;

describe("Validate CheckIn Use Service", () => {
  beforeEach(async () => {
    inMemoryCheckInDatabaseRepository = new InMemoryCheckInDatabaseRepository();
    sut = new ValidateCheckInService(inMemoryCheckInDatabaseRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Deve ser possível validar o check in", async () => {
    const createdCheckIn = await inMemoryCheckInDatabaseRepository.create({
      gym_id: "teste",
      user_id: "teste",
    });

    const { checkIn } = await sut.handle({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInDatabaseRepository.itens[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("Não deve ser possível validar um check in que não existe", async () => {
    const createdCheckIn = await inMemoryCheckInDatabaseRepository.create({
      gym_id: "teste",
      user_id: "teste",
    });

    await expect(
      async () =>
        await sut.handle({
          checkInId: "createdCheckIn.id",
        })
    ).rejects.instanceOf(ResourceNotFoundError);
  });

  it("Não deve ser possível validar um check in após 20min da sua criação", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await inMemoryCheckInDatabaseRepository.create({
      gym_id: "teste",
      user_id: "teste",
    });

    const TIME_TO_ADVANCED_IN_MS = 1000 * 60 * 21; // 1000 * 60 * 21 = 21min

    vi.advanceTimersByTime(TIME_TO_ADVANCED_IN_MS);

    await expect(() =>
      sut.handle({
        checkInId: createdCheckIn.id,
      })
    ).rejects.instanceOf(LateCheckInValidationError);
  });
});
