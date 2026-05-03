import { ResponseErrorName } from "../types/responseErrorNames.types";

export class ResponseError extends Error {
  constructor(message: string, errorName: ResponseErrorName) {
    super(message);
    this.name = errorName;
  }
}