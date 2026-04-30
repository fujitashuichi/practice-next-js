import { SaveUserDto, User } from "@/schemas";
import { UserRepository } from "../repository";
import { EmailAlreadyRegisteredError, UserUndefinedError } from "../error";
import { hashPassword } from "../lib";

export class UserService {
  private readonly repository = new UserRepository();



  createUser = async (dto: SaveUserDto): Promise<{ user: User }> => {
    if (await this.repository.findByEmail(dto.email) !== null) {
      console.error(`${dto.email}: already registered`);
      throw new EmailAlreadyRegisteredError(dto.email);
    }

    const hashed = await hashPassword(dto.password);

    const newUser = {
      email: dto.email,
      passwordHash: hashed,
      createdAt: new Date()
    }

    const savedUser: User | null = await this.repository.createUser(newUser);
    if (!savedUser) throw new UserUndefinedError();

    return { user: savedUser };
  }

  findById = async (id: User["id"]) => {
    return await this.repository.findById(id);
  }

  findByEmail = async (email: User["email"]) => {
    return await this.repository.findByEmail(email);
  }
}
