import { prisma } from "@/lib/prisma"
import { logger } from "@/tools/log";
import { queryHandler } from "./queryHandler";


import { queryHandler } from "./queryHandler";



export class UserRepository {
  constructor() {}


  connect = queryHandler({
    async queryFn() {
      await prisma.$connect();
      return logger.trace("Prisma connection succeed.");
    },
    onError(err) {
      logger.fatal(`Prisma connection failed.\n ${err}`);
    }
  })

  findMany = queryHandler({
    async queryFn() {
      return await prisma.project.findMany();
    },
    onError(err) {
      logger.fatal(err);
    },
  });
}
