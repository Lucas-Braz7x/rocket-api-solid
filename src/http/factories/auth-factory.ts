import { UserRepository } from '../repositories/prisma';
import { AuthService } from '../services/auth/auth.service';

export const authFactory = () => new AuthService(new UserRepository());


