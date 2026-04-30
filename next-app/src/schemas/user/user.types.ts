import { z } from "zod"


// passwordHashを含むデータ型は必ずBE側で定義する
// ここでは、FE/BE両方で使えるプロパッティだけを定義する
export const UserSchema = z.object({
  id: z.cuid(),
  email: z.email()
});
export type User = z.infer<typeof UserSchema>;
