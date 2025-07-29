import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsService } from "./search-gyms.service";
import { InMemoryGymDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-gym.repository";

let inMemoryGymDatabaseRepository: InMemoryGymDatabaseRepository;
let sut: SearchGymsService;

describe("Search Gyms Service", () => {
  beforeEach(async () => {
    inMemoryGymDatabaseRepository = new InMemoryGymDatabaseRepository();
    sut = new SearchGymsService(inMemoryGymDatabaseRepository);
  });

  it("Deve ser possível pesquisar academias", async () => {
    await inMemoryGymDatabaseRepository.create({
      title: "Academiazona",
      description: "",
      phone: "",
      latitude: -22.4327836,
      longitude: -43.138504,
    });

    await inMemoryGymDatabaseRepository.create({
      title: "AcademiaNova",
      description: "",
      phone: "",
      latitude: -22.4327836,
      longitude: -43.138504,
    });

    const { gyms } = await sut.handle({
      query: "zona",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Academiazona" })]);
  });

  it("Deve ser possível listar as academias por página", async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryGymDatabaseRepository.create({
        title: "AcademiaNova " + index,
        description: "",
        phone: "",
        latitude: -22.4327836,
        longitude: -43.138504,
      });
    }

    const { gyms } = await sut.handle({
      query: "AcademiaNova",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "AcademiaNova 21" }),
      expect.objectContaining({ title: "AcademiaNova 22" }),
    ]);
  });
});
