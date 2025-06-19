import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../prisma/dto/check-in.repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInDatabaseRepository implements CheckInRepository {
  public itens: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const record = {
      id: randomUUID(),
      ...data,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.itens.push(record);

    return record;
  }
}
