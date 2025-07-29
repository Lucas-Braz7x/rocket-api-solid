import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms.service";
import { InMemoryGymDatabaseRepository } from "@/http/repositories/in-memory/in-memory-database-gym.repository";

let inMemoryGymDatabaseRepository: InMemoryGymDatabaseRepository;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    inMemoryGymDatabaseRepository = new InMemoryGymDatabaseRepository();
    sut = new FetchNearbyGymsService(inMemoryGymDatabaseRepository);
  });

  //-22.4445821, -43.1717814; - perto
  // -22.4104023,-43.3998306 - longe

  it("Deve ser possível pesquisar academias próximas", async () => {
    await inMemoryGymDatabaseRepository.create({
      title: "Academia próxima",
      description: "",
      phone: "",
      latitude: -22.4445821,
      longitude: -43.1717814,
    });

    await inMemoryGymDatabaseRepository.create({
      title: "Academia longe",
      description: "",
      phone: "",
      latitude: -22.4104023,
      longitude: -43.3998306,
    });

    const { gyms } = await sut.handle({
      userLatitude: -22.4502602, // -22.4502602,-43.1655207,
      userLongitude: -43.1655207,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Academia próxima" }),
    ]);
  });
});
