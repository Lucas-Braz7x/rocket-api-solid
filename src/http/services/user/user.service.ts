import { hash } from "bcryptjs";
import { BaseUserRepository } from "@/http/repositories/prisma/dto/user.repository";
import { UserExistError } from "../../../config/errors";
import type { User } from "@prisma/client";

interface RegisterUserServiceProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  constructor(private userRepository: BaseUserRepository) {}

  async handle({
    name,
    email,
    password,
  }: RegisterUserServiceProps): Promise<User> {
    const password_hash = await hash(password, 6);

    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new UserExistError();
    }

    return this.userRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
