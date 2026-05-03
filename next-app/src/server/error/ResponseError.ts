import { ResponseErrorName } from "@/schemas/error";

export class ResponseError extends Error {
  constructor(message: string, errorName: ResponseErrorName) {
    super(message);
    this.name = errorName;
  }
}