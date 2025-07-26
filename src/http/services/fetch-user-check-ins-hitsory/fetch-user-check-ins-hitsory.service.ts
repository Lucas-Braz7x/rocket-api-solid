import { CheckInRepository } from "@/http/repositories/prisma/dto/check-in.repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryRequest {
  userId: string;
  page?: number;
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInRepository) {}

  async handle({
    userId,
    page,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
