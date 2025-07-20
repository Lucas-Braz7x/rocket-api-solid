import { Gym } from "@prisma/client";
import { GymRepository } from "../prisma/dto/gym.repository";

export class InMemoryGymDatabaseRepository implements GymRepository {
  public itens: Gym[] = [];

  async findById(id: string) {
    const gym = this.itens.find((record) => record.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
