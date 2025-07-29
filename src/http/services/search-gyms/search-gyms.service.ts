import { hash } from "bcryptjs";
import { BaseUserRepository } from "@/http/repositories/prisma/dto/user.repository";
import { UserExistError } from "../../../config/errors";
import type { Gym } from "@prisma/client";
import { GymRepository } from "@/http/repositories/prisma/dto/gym.repository";

interface SearchGymsRequest {
  query: string;
  page: number;
}

interface SearchGymsResponse {
  gyms: Gym[];
}

export class SearchGymsService {
  constructor(private gymRepository: GymRepository) {}

  async handle({
    query,
    page,
  }: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return { gyms };
  }
}
