"use server";

import { Project, ProjectSchema } from "@/schemas/project";
import { actionHandler } from "../lib/actionsHandler";
import { parseFormData } from "../lib/parseFormData";
import { ActionResult } from "../types/actionResult.types";
import { ProjectService } from "./service/project.service";
import { CreateProjectPayloadSchema, UpdateProjectPayloadSchema } from "./types";


const service = new ProjectService();


const create = async (formData: FormData): Promise<ActionResult<Project>> => {
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

const update = async (formData: FormData, id: Project["id"]): Promise<ActionResult<Project>> => {
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


const remove = async (id: Project["id"]): Promise<ActionResult<Project>> => {
  const parsed = ProjectSchema.pick({ id: true }).safeParse(id);

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


export const projectActions = { create, update, remove };
