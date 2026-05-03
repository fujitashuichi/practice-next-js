import { z } from "zod";
import { ProjectWithoutTimeSchema } from "@/schemas/project";
import { schemaTransformer } from "@/server/lib/schemaTransformer";


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
