import { ResourceNotFoundError } from "@/config/errors/resource-not-found";
import type { CheckInRepository } from "@/http/repositories/prisma/dto/check-in.repository";
import { GymRepository } from "@/http/repositories/prisma/dto/gym.repository";
import { getDistanceCoordinate } from "@/utils/get-distance-coordinates";
import { CheckIn } from "@prisma/client";

interface CheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private repository: CheckInRepository,
    private gymsRepository: GymRepository
  ) {}

  async handle({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceCoordinate(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error();
    }

    const checkInOnSameDate = await this.repository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) {
      throw new Error("TESTEEEEE");
    }

    const checkIn = await this.repository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
