import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "./dto/check-in.repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return prisma.checkIn.create({ data });
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page = 1) {
    return prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async findById(checkIn: string) {
    return prisma.checkIn.findUnique({
      where: {
        id: checkIn,
      },
    });
  }

  async save(checkIn: CheckIn) {
    return prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });
  }

  async countByUserId(userId: string) {
    return prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
  }
}
