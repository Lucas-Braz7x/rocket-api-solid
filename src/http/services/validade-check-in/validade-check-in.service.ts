import { LateCheckInValidationError } from "@/config/errors/late-check-in_validation-error";
import { ResourceNotFoundError } from "@/config/errors/resource-not-found";
import type { CheckInRepository } from "@/http/repositories/prisma/dto/check-in.repository";
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";

interface ValidateCheckInRequest {
  checkInId: string;
}

interface ValidateCheckInResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private repository: CheckInRepository) {}

  async handle({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.repository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.repository.save(checkIn);

    return {
      checkIn,
    };
  }
}
