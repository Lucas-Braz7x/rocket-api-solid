import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page?: number): Promise<CheckIn[]>;
  findById(checkIn: string): Promise<CheckIn | null>;
  save(checkIn: CheckIn): Promise<CheckIn>;
  countByUserId(userId: string): Promise<number>;
}
