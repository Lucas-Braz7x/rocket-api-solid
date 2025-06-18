import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUserDatabaseRepository } from "../../repositories/in-memory/in-memory-database-user.repository";
import { hash } from "bcryptjs";
import { ProfileService } from './profile-service';
import { ResourceNotFoundError } from '@/config/errors/resource-not-found';

let inMemoryUserDatabaseRepository: InMemoryUserDatabaseRepository;

let sut: ProfileService;

describe("Profile Use Service", () => {
  beforeEach(() => {
    inMemoryUserDatabaseRepository = new InMemoryUserDatabaseRepository();

    sut = new ProfileService(inMemoryUserDatabaseRepository);
  });

  it("Deve ser possível buscar um usuário pelo Id", async () => {
    const password = "123456";

    const createdUser = await inMemoryUserDatabaseRepository.create({
      email: "teste@gmail.com",
      name: "teste",
      password_hash: await hash(password, 6),
    });

    const { user } = await sut.handle({userId: createdUser.id});

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("teste");
  });

  it("Não deve ser possível buscar um usuário pelo Id errado", async () => {
    await expect(() =>
      sut.handle({
        userId: "id-que-nao-existe"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

 
});
