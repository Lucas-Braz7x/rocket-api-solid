import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyGymsProps {
  userLatitude: number;
  userLongitude: number;
}

export interface GymRepository {
  findById(id: string): Promise<Gym | null>;
  findManyNearbyGyms({
    userLatitude,
    userLongitude,
  }: FindManyNearbyGymsProps): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
}
