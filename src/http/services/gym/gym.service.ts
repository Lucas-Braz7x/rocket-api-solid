import { hash } from "bcryptjs";
import { BaseUserRepository } from "@/http/repositories/prisma/dto/user.repository";
import { UserExistError } from "../../../config/errors";
import type { Gym } from "@prisma/client";
import { GymRepository } from "@/http/repositories/prisma/dto/gym.repository";

interface CreateGymRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymResponse {
  gym: Gym;
}

export class GymService {
  constructor(private gymRepository: GymRepository) {}

  async handle({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
