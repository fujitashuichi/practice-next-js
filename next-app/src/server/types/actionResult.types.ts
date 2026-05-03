import { ResponseErrorName } from "@/schemas/error";

export type ActionResult<T> =
  | { success: false, errorName: ResponseErrorName }
  | { success: true, data: T }
