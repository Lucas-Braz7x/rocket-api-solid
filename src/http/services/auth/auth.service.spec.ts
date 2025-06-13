import { AuthService } from "./auth.service";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUserDatabaseRepository } from "../../repositories/in-memory/in-memory-database-user.repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/config/errors";

let inMemoryUserDatabaseRepository: InMemoryUserDatabaseRepository;

let sut: AuthService;

describe("Auth Use Service", () => {
  beforeEach(() => {
    inMemoryUserDatabaseRepository = new InMemoryUserDatabaseRepository();

    sut = new AuthService(inMemoryUserDatabaseRepository);
  });

  it("Deve ser possível um usuário cadastrado logar no sistema", async () => {
    const password = "123456";

    await inMemoryUserDatabaseRepository.create({
      email: "teste@gmail.com",
      name: "teste",
      password_hash: await hash(password, 6),
    });

    const { user } = await sut.handle({
      email: "teste@gmail.com",
      password,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Não Deve ser possível um usuário não cadastrado logar no sistema", async () => {
    await expect(() =>
      sut.handle({
        email: "teste2@gmail.com",
        password: "123456789",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Não Deve ser possível um usuário cadastrado logar no sistema com as credenciais inválidas", async () => {
    const password = "123456";

    await inMemoryUserDatabaseRepository.create({
      email: "teste2@gmail.com",
      name: "teste",
      password_hash: await hash(password, 6),
    });

    await expect(() =>
      sut.handle({
        email: "teste2@gmail.com",
        password: "987456123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
