import { CheckInRepository } from "@/http/repositories/prisma/dto/check-in.repository";
import { CheckIn } from "@prisma/client";

interface GetUserMetricsRequest {
  userId: string;
}

interface GetUserMetricsResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInRepository) {}

  async handle({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
