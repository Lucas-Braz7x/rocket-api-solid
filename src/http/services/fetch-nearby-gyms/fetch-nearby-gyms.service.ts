import type { Gym } from "@prisma/client";
import { GymRepository } from "@/http/repositories/prisma/dto/gym.repository";

interface FetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsService {
  constructor(private gymRepository: GymRepository) {}

  async handle({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymRepository.findManyNearbyGyms({
      userLatitude,
      userLongitude,
    });

    return { gyms };
  }
}
