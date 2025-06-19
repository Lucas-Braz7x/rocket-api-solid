import { InvalidCredentialsError } from "@/config/errors/invalid-credentials";
import type { CheckInRepository } from "@/http/repositories/prisma/dto/check-in.repository";
import { CheckIn } from "@prisma/client";
import { compare } from "bcryptjs";

interface CheckInRequest {
  userId: string;
  gymId: string;
}

interface CheckInResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private repository: CheckInRepository) {}

  async handle({ userId, gymId }: CheckInRequest): Promise<CheckInResponse> {
    const checkIn = await this.repository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
