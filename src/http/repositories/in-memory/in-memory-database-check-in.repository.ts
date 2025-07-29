import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../prisma/dto/check-in.repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInDatabaseRepository implements CheckInRepository {
  public itens: CheckIn[] = [];

  async findManyByUserId(userId: string, page = 1): Promise<CheckIn[]> {
    return this.itens
      .filter((record) => record.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async findById(id: string) {
    const checkIn = this.itens.find((record) => record.id === id);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    return this.itens.filter((record) => record.user_id === userId).length;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const checkInOnSameDate = await this.itens.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);

      const isOnSameDate = checkInDate.isSame(dayjs(date), "date");

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

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

  async save(checkIn: CheckIn) {
    const checkInIndex = this.itens.findIndex(
      (record) => (record.id = checkIn.id)
    );

    if (checkInIndex >= 0) {
      this.itens[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
