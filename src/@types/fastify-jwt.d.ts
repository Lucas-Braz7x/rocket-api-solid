import { ROLE } from "./../../node_modules/.pnpm/@prisma+client@4.10.1_prisma@4.10.1/node_modules/.prisma/client/index.d";
import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      role: ROLE;
      sub: string;
    };
  }
}
