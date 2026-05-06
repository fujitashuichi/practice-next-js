import { z } from "zod";
import { CreateProjectPayloadSchema, UpdateProjectPayloadSchema } from "../project/types";

export const CreateProjectFormSchema = CreateProjectPayloadSchema.omit({
  userId: true
});
export type CreateProjectForm = z.infer<typeof CreateProjectFormSchema>;


export const UpdateProjectFormSchema = UpdateProjectPayloadSchema;
export type UpdateProjectForm = z.infer<typeof UpdateProjectFormSchema>;
