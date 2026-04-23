import { prisma } from "@/lib/prisma"
import { logger } from "@/tools/log";

export class UserRepository {
  constructor() {}


  connect = async () => {
    try {
      await prisma.$connect();

      return logger.trace("Prisma connection succeed.");
    } catch (e) {
      logger.fatal(`Prisma connection failed.\n ${e}`);
      throw e;

    }
  }
}
