import { prisma } from "@/lib/prisma"
import { logger } from "@/tools/log";
import { queryHandler } from "./queryHandler";
import { User } from "@/schemas";
import { DbUser, SaveUserPayload } from "../types";


export class UserRepository {
  constructor() {}

  // 認証などに使わないものはselectを必須にする
  private readonly select = {
    id: true,
    email: true,
    createdAt: true,
  }


  findMany = async (): Promise<User[]> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.findMany({ select: this.select });
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }


  saveUser = async (data: SaveUserPayload): Promise<User | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.create({ data, select: this.select })
      },
      onError(err) {
        logger.fatal(err);
      },
    })
  }

  deleteUser = async (id: User["id"]): Promise<User | null> => {
    // Foreign_key制約によって、プロジェクトの削除が必須
    await prisma.project.deleteMany();
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.delete({ where: { id } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  findById = async (id: User["id"]): Promise<User | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.findUnique({ where: { id }, select: this.select })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  findByEmail = async (email: User["email"]): Promise<User | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.findUnique({ where: { email }, select: this.select })
      },
      onError(err) {
        logger.fatal(err);
      },
    })
  }


  // 認証用には passwordHash を含める
  findByEmailForAuthOnly = async (email: string): Promise<DbUser | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.findUnique({ where: { email } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }
}
