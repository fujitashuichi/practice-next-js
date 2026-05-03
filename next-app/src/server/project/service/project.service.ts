import { Project } from "@/schemas/project";
import { ProjectRepository } from "../repository";
import { CreateProjectPayload, UpdateProjectPayload } from "../types";


export class ProjectService {
  private readonly repository = new ProjectRepository();

  constructor () {}


  createProject = async (data: CreateProjectPayload) => {
    return await this.repository.createProject(data);
  }

  updateProject = async (data: UpdateProjectPayload, id: Project["id"]) => {
    return await this.repository.updateProject(data, id);
  }

  deleteProject = async (id: Project["id"]) => {
    return await this.repository.deleteProject(id);
  }


  findById = async (id: Project["id"]) => {
    return await this.repository.findById(id);
  }

  findByUserId = async (userId: Project["userId"]) => {
    return await this.repository.findByUserId(userId);
  }
}
