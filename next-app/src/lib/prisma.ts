import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";


const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool);
export const newPrisma = new PrismaClient({ adapter });


const globalForPrisma = global as unknown as { prisma: PrismaClient };


export const prisma = globalForPrisma.prisma || newPrisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
