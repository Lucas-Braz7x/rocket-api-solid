import { Gym, Prisma } from "@prisma/client";
import {
  FindManyNearbyGymsProps,
  GymRepository,
} from "../prisma/dto/gym.repository";
import { randomUUID } from "crypto";
import { getDistanceCoordinate } from "@/utils/get-distance-coordinates";

export class InMemoryGymDatabaseRepository implements GymRepository {
  public itens: Gym[] = [];

  async findById(id: string) {
    const gym = this.itens.find((record) => record.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findManyNearbyGyms({
    userLatitude,
    userLongitude,
  }: FindManyNearbyGymsProps): Promise<Gym[]> {
    return this.itens.filter((record) => {
      const distance = getDistanceCoordinate(
        { latitude: userLatitude, longitude: userLongitude },
        {
          latitude: record.latitude.toNumber(),
          longitude: record.longitude.toNumber(),
        }
      );
      return distance < 10;
    });
  }

  async searchMany(query: string, page: number) {
    return this.itens
      .filter((record) => record.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id || randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.itens.push(gym);

    return gym;
  }
}
