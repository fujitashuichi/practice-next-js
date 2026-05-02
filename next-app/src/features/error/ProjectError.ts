import { ResponseErrorName } from "../types";
import { ResponseError } from "./ResponseError";

export class ProjectError extends ResponseError {
  constructor(message: string, errorName: ResponseErrorName) {
    super(message, errorName);
  }
}

export class DuplicateProjectError extends ProjectError {
  constructor() {
    super("Cannot create Project because same ProjectName found", "DuplicateProjectError");
  }
}

export class ProjectUndefinedError extends ProjectError {
  constructor() {
    super("Project undefined", "ProjectUndefinedError");
  }
}
