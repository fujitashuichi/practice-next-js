import { z } from "zod";
import { UserSchema } from "@/schemas/user";

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
