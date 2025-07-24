import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-gym.repository";
import { GymService } from "./gym.service";

let inMemoryGymDatabaseRepository: InMemoryGymDatabaseRepository;

let sut: GymService;

describe("Register Use Service", () => {
  beforeEach(() => {
    inMemoryGymDatabaseRepository = new InMemoryGymDatabaseRepository();

    sut = new GymService(inMemoryGymDatabaseRepository);
  });

  it("Deve ser possível cadastrar uma academia", async () => {
    const { gym } = await sut.handle({
      title: "Academiazona",
      description: "",
      phone: "",
      latitude: -22.4327836,
      longitude: -43.138504,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
