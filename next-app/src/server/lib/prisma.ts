import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const globalForPrisma = global as unknown as { serverPrisma: PrismaClient };

export const prisma = globalForPrisma.serverPrisma || new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.serverPrisma = prisma;
