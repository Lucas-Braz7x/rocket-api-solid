import { compare } from "bcryptjs";
import { RegisterUserService } from "./user.service";
import { expect, describe, it } from "vitest";
import { InMemoryUserDatabaseRepository } from "../repositories/in-memory/in-memory-database-user.repository";
import { UserExistError } from "./errors";

describe("Register Use Service", () => {
  it("Deve ser possível cadastrar um usuário", async () => {
    const inMemoryUserDatabaseRepository = new InMemoryUserDatabaseRepository();
    const registerUserService = new RegisterUserService(
      inMemoryUserDatabaseRepository
    );

    const user = await registerUserService.handle({
      name: "teste",
      email: "teste@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("A senha do usuário deve ser um hash", async () => {
    const inMemoryUserDatabaseRepository = new InMemoryUserDatabaseRepository();
    const registerUserService = new RegisterUserService(
      inMemoryUserDatabaseRepository
    );

    const user = await registerUserService.handle({
      name: "teste",
      email: "teste@gmail.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("Não deve ser possível se cadastrar com o mesmo email", async () => {
    const inMemoryUserDatabaseRepository = new InMemoryUserDatabaseRepository();
    const registerUserService = new RegisterUserService(
      inMemoryUserDatabaseRepository
    );

    const email = "teste@gmail.com";

    const user = await registerUserService.handle({
      name: "teste",
      email,
      password: "123456",
    });

    expect(() =>
      registerUserService.handle({
        name: "teste",
        email,
        password: "123456",
      })
    ).rejects.instanceOf(UserExistError);
  });
});
