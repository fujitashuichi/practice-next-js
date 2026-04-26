import { z } from "zod";
import { UserSchema, UserWithoutTimeSchema } from "@/schemas";
import { ProjectWithoutTimeSchema } from "@/schemas/project";
import { schemaTransformer } from "./schemaTransformer";

export const DbUserSchema = UserSchema.extend({
  passwordHash: z.string()
});
export type DbUser = z.infer<typeof DbUserSchema>;


export const SaveUserPayloadSchema = UserWithoutTimeSchema.omit({
  id: true
}).extend({
  passwordHash: z.string()
});
export type SaveUserPayload = z.infer<typeof SaveUserPayloadSchema>


export const SaveProjectPayloadSchema = ProjectWithoutTimeSchema.omit({ id: true });
export type SaveProjectPayload = z.infer<typeof SaveProjectPayloadSchema>;


export const UpdateProjectPayloadSchema = ProjectWithoutTimeSchema
  .pick({
    title: true,
    description: true,
    status: true
  })
  .partial()
  .transform(schemaTransformer.toPrismaUpdate);
export type UpdateProjectPayload = z.infer<typeof UpdateProjectPayloadSchema>;
