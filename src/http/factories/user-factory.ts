import { UserRepository } from '../repositories/prisma';
import { RegisterUserService } from '../services/user/user.service';

export const userFactory = () => new RegisterUserService(new UserRepository());


