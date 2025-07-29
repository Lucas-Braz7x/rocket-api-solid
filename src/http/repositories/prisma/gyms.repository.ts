import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyGymsProps, GymRepository } from "./dto/gym.repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymRepository implements GymRepository {
  async findById(id: string) {
    return prisma.gym.findUnique({
      where: {
        id,
      },
    });
  }
  async findManyNearbyGyms({
    userLatitude: latitude,
    userLongitude: longitude,
  }: FindManyNearbyGymsProps) {
    //  return this.itens.filter((record) => {
    //       const distance = getDistanceCoordinate(
    //         { latitude: userLatitude, longitude: userLongitude },
    //         {
    //           latitude: record.latitude.toNumber(),
    //           longitude: record.longitude.toNumber(),
    //         }
    //       );
    //       return distance < 10;
    //     });

    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    return prisma.gym.create({ data });
  }
  async searchMany(query: string, page: number) {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }
}
