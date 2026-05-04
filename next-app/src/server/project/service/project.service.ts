import { Project } from "@/schemas/project";
import { ProjectRepository } from "../repository";
import { CreateProjectPayload, UpdateProjectPayload } from "../types";


export class ProjectService {
  private readonly repository = new ProjectRepository();

  constructor () {}


  createProject = async (data: CreateProjectPayload): Promise<Project> => {
    const result = await this.repository.createProject(data);

    return result;
  }

  updateProject = async (data: UpdateProjectPayload, id: Project["id"]): Promise<Project> => {
    const result = await this.repository.updateProject(data, id);

    return result;
  }

  deleteProject = async (id: Project["id"]): Promise<Project> => {
    return await this.repository.deleteProject(id);
  }


  findById = async (id: Project["id"]): Promise<Project | null> => {
    return await this.repository.findById(id);
  }

  findByUserId = async (userId: Project["userId"]): Promise<Project[]> => {
    return await this.repository.findByUserId(userId);
  }
}
