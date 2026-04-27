import { User } from "@/schemas";
import { UserRepository } from "../repository";

export class UserService {
  private readonly repository = new UserRepository();

  findById = async (id: User["id"]) => {
    return await this.repository.findById(id);
  }

  findByEmail = async (email: User["email"]) => {
    return await this.repository.findByEmail(email);
  }
}
