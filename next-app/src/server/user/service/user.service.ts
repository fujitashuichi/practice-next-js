import { User } from "@/schemas/user";
import { UserRepository } from "../repository";

export class UserService {
  private readonly repository = new UserRepository();


  findById = async (id: User["id"]) => {
    return await this.repository.findById(id);
  }
}
