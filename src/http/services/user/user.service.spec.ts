import { compare } from "bcryptjs";
import { RegisterUserService } from "./user.service";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUserDatabaseRepository } from "../../repositories/in-memory/in-memory-database-user.repository";
import { UserExistError } from "../../../config/errors";

let inMemoryUserDatabaseRepository: InMemoryUserDatabaseRepository;

let sut: RegisterUserService;

describe("Register Use Service", () => {
  beforeEach(() => {
    inMemoryUserDatabaseRepository = new InMemoryUserDatabaseRepository();

    sut = new RegisterUserService(inMemoryUserDatabaseRepository);
  });

  it("Deve ser possível cadastrar um usuário", async () => {
    const user = await sut.handle({
      name: "teste",
      email: "teste@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("A senha do usuário deve ser um hash", async () => {
    const user = await sut.handle({
      name: "teste",
      email: "teste@gmail.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("Não deve ser possível se cadastrar com o mesmo email", async () => {
    const email = "teste@gmail.com";

    await sut.handle({
      name: "teste",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.handle({
        name: "teste",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserExistError);
  });
});
