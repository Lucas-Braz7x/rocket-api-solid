import { PrismaCheckInRepository } from "../repositories/prisma/check-in.repository";
import { GetUserMetricsService } from "../services/metrics/metrics.service";

export const metricsFactory = () =>
  new GetUserMetricsService(new PrismaCheckInRepository());
