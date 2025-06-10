import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterUserServiceProps {
  name: string;
  email: string;
  password: string;
}

export const registerUserService = async ({
  name,
  email,
  password,
}: RegisterUserServiceProps) => {
  const password_hash = await hash(password, 6);

  const userAlreadyExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExist) {
    throw new Error("Email already exist");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
};
