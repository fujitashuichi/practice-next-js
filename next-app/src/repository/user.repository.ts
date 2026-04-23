import { prisma } from "@/lib/prisma"

export class userRepository {
  constructor() {}

  connect = async () => {
    try {
      await prisma.$connect();
    } catch (e) {
      console.error("Prisma connection failed.\n", e);
    }
  }
}
