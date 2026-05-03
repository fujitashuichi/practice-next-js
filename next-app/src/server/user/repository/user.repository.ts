import { logger } from "@/tools/log";
import { User } from "@/schemas/user";
import { prisma } from "@/lib";
import { queryHandler } from "@/server/project/repository/internal/queryHandler";


export class UserRepository {
  constructor() {}

  // 認証などに使わないものはselectを必須にする
  // これによって、passwordHash が外部に漏れることを防ぐ
  private readonly select = {
    id: true,
    email: true
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
}
