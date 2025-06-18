import { User } from '@prisma/client';
import type { UserRepository } from "@/http/repositories/prisma/user.repository";
import { ResourceNotFoundError } from '@/config/errors/resource-not-found';

interface ProfileRequest {
  userId: string
}

interface ProfileResponse {
  user: User;
}

export class ProfileService {
  constructor(private userRepository: UserRepository) {}

  async handle({ userId }: ProfileRequest): Promise<ProfileResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
