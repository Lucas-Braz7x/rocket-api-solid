import { hash } from "bcryptjs";
import { BaseUserRepository } from "../repositories/dto/user.repository";

interface RegisterUserServiceProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  constructor(private userRepository: BaseUserRepository) {}

  async handle({ name, email, password }: RegisterUserServiceProps) {
    const password_hash = await hash(password, 6);

    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new Error("Email already exist");
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
