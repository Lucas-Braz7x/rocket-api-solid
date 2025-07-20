import { ResourceNotFoundError } from "@/config/errors/resource-not-found";
import type { CheckInRepository } from "@/http/repositories/prisma/dto/check-in.repository";
import { GymRepository } from "@/http/repositories/prisma/dto/gym.repository";
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

  async handle({ userId, gymId }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
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
