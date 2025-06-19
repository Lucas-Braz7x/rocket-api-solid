import { Prisma, User } from "@prisma/client";
import { BaseUserRepository } from "../prisma/dto/user.repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserDatabaseRepository implements BaseUserRepository {
  public itens: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.itens.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.itens.find((record) => record.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.itens.find((record) => record.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
