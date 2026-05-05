"use server";

import { Project, ProjectSchema } from "@/schemas/project";
import { actionHandler } from "../lib/actionsHandler";
import { parseFormData } from "../lib/parseFormData";
import { ActionResult } from "../types/actionResult.types";
import { ProjectService } from "./service/project.service";
import { CreateProjectPayloadSchema, UpdateProjectPayloadSchema } from "./types";
import { auth } from "@/auth";


const service = new ProjectService();


export const createProjectAction = async (formData: FormData): Promise<ActionResult<Project>> => {
  const parsed = await parseFormData({
    formData,
    schema: CreateProjectPayloadSchema,
    useFor: "create"
  });

  if (!parsed.success) return {
    success: false,
    errorName: "InvalidRequestDataError"
  };

  return await actionHandler({
    async action() {
      return await service.createProject(parsed.data)
    }
  })
}

export const updateProjectAction = async (formData: FormData, id: Project["id"]): Promise<ActionResult<Project>> => {
  const parsed = await parseFormData({
    formData,
    schema: UpdateProjectPayloadSchema,
    useFor: "update"
  });

  if (!parsed.success) {
    return {
      success: false,
      errorName: "InvalidRequestDataError"
    }
  }

  return await actionHandler({
    async action() {
      return await service.updateProject(parsed.data, id);
    },
  })
}


export const removeProjectAction = async (id: Project["id"]): Promise<ActionResult<Project>> => {
  const parsed = ProjectSchema.pick({ id: true }).safeParse({ id });

  if (!parsed.success) {
    return {
      success: false,
      errorName: "InvalidRequestDataError"
    }
  }

  return await actionHandler({
    async action() {
      return await service.deleteProject(id);
    },
  })
}


export const getUsersProjectsAction = async (): Promise<ActionResult<Project[]>> => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return {
      success: false,
      errorName: "UnAuthorizedError"
    }
  }

  const userId = user.id;
  if (!userId) {
    return {
      success: false,
      errorName: "AuthError"
    }
  }

  const parsed = ProjectSchema.pick({ userId: true }).safeParse({ userId });

  if (!parsed.success) {
    return {
      success: false,
      errorName: "InvalidRequestDataError"
    }
  }

  return await actionHandler({
    async action() {
      return await service.findByUserId(userId);
    },
  })
}
