import { InvalidCredentialsError } from "@/config/errors/invalid-credentials";
import type { UserRepository } from "@/http/repositories/prisma/user.repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
}

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async handle({ email, password }: AuthRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    console.log({ doesPasswordMatches });

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
