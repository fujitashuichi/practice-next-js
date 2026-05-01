import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";


const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error("DATABASE_URL undefined.");


const connectionString = databaseUrl;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined, pgPool: Pool | undefined };

const pool = globalForPrisma.pgPool ?? new Pool({ connectionString });
if (process.env.NODE_ENV !== "production") globalForPrisma.pgPool = pool;

const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
