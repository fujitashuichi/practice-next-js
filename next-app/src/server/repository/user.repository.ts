import { prisma } from "@/lib/prisma"
import { logger } from "@/tools/log";
import { queryHandler } from "./queryHandler";
import { User } from "@/schemas";
import { SaveUserPayload } from "../types";


export class UserRepository {
  constructor() {}

  // 認証などに使わないものはselectを必須にする
  // これによって、passwordHash が外部に漏れることを防ぐ
  private readonly select = {
    id: true,
    email: true,
    createdAt: true,
  }


  findMany = async () => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.findMany({ select: this.select });
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }


  createUser = async (data: SaveUserPayload) => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.create({ data, select: this.select })
      },
      onError(err) {
        logger.fatal(err);
      },
    })
  }

  deleteUser = async (id: User["id"]) => {
    return queryHandler({
      queryFn: async () => {
        // Foreign_key制約によって、プロジェクトの削除が必須
        const [, result] = await prisma.$transaction([
          prisma.project.deleteMany({ where: { userId: id } }),
          prisma.user.delete({ where: { id }, select: this.select })
        ]);
        return result;
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  findById = async (id: User["id"]) => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.user.findUnique({ where: { id }, select: this.select })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  findByEmail = async (email: User["email"]) => {
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
  findByEmailForAuthOnly = async (email: string) => {
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
