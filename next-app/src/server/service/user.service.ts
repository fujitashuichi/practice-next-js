import { SaveUserDto, User } from "@/schemas";
import { UserRepository } from "../repository";
import { EmailAlreadyRegisteredError, UserUndefinedError } from "../error";

export class UserService {
  private readonly repository = new UserRepository();


  /*
  createUser = async (dto: SaveUserDto): Promise<{ user: User }> => {
    if (await this.repository.findByEmail(dto.email) !== null) {
      console.error(`${dto.email}: already registered`);
      throw new EmailAlreadyRegisteredError(dto.email);
    }


    const newUser = {
      email: dto.email,
      createdAt: new Date()
    }

    const savedUser: User | null = await this.repository.createUser(newUser);
    if (!savedUser) throw new UserUndefinedError();

    return { user: savedUser };
  }
    */

  findById = async (id: User["id"]) => {
    return await this.repository.findById(id);
  }

  findByEmail = async (email: User["email"]) => {
    return await this.repository.findByEmail(email);
  }
}
