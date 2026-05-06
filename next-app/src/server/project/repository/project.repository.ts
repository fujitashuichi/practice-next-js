import { Project } from "@/schemas/project";
import { queryHandler } from "./internal/queryHandler";
import { logger } from "@/tools/log";
import { CreateProjectPayload, UpdateProjectPayload } from "../types";
import { prisma } from "@/lib";


export class ProjectRepository {
  constructor() {}

  createProject = async (data: CreateProjectPayload) => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.create({ data })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  updateProject = async (data: UpdateProjectPayload, id: Project["id"]) => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.update({ data, where: { id } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  deleteProject = async (id: Project["id"]) => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.delete({ where: { id } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }


  findById = async (id: Project["id"]) => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.findUnique({ where: { id } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  findByUserId = async (userId: Project["userId"]) => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.findMany({ where: { userId } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }
}
