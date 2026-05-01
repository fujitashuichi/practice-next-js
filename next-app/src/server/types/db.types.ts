import { z } from "zod";
import { UserSchema } from "@/schemas";
import { ProjectWithoutTimeSchema } from "@/schemas/project";
import { schemaTransformer } from "./schemaTransformer";

export const DbUserSchema = UserSchema.extend({
  passwordHash: z.string()
});
export type DbUser = z.infer<typeof DbUserSchema>;


export const SaveUserPayloadSchema = UserSchema.omit({
  id: true
}).extend({
  passwordHash: z.string()
});
export type SaveUserPayload = z.infer<typeof SaveUserPayloadSchema>


export const CreateProjectPayloadSchema = ProjectWithoutTimeSchema.omit({ id: true });
export type CreateProjectPayload = z.infer<typeof CreateProjectPayloadSchema>;


export const UpdateProjectPayloadSchema = ProjectWithoutTimeSchema
  .pick({
    title: true,
    description: true,
    status: true
  })
  .partial()
  .transform(schemaTransformer.toPrismaUpdate);
export type UpdateProjectPayload = z.infer<typeof UpdateProjectPayloadSchema>;
