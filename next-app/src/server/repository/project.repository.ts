import { Project } from "@/schemas/project";
import { queryHandler } from "./queryHandler";
import { logger } from "@/tools/log";
import { prisma } from "@/lib/prisma";
import { SaveProjectPayload, UpdateProjectPayload } from "../types";

export class ProjectsRepository {
  saveProject = async (data: SaveProjectPayload): Promise<Project | null> => {
    return queryHandler({
      queryFn: async () => {
        return prisma.project.create({ data })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  updateProject = async (data: UpdateProjectPayload, id: Project["id"]): Promise<Project | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.update({ data, where: { id } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  deleteProject = async (id: Project["id"]): Promise<Project | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.delete({ where: { id } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }


  findById = async (id: Project["id"]): Promise<Project | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.findUnique({ where: { id } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  findByUserId = async (userId: Project["userId"]): Promise<Project[] | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.findMany({ where: { userId } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }

  findByTitle = async (title: Project["title"]): Promise<Project[] | null> => {
    return queryHandler({
      queryFn: async () => {
        return await prisma.project.findMany({ where: { title } })
      },
      onError(err) {
        logger.fatal(err);
      },
    });
  }
}
