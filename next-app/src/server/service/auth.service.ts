import { SaveUserDto, User } from "@/schemas";
import { UserRepository } from "../repository";
import { EmailAlreadyRegisteredError, UserUndefinedError } from "../error";
import { hashPassword } from "../lib";
import z from "zod";


export class RegisterService {
  private userRepository = new UserRepository();


  createUser = async (dto: SaveUserDto): Promise<{ user: User }> => {
    if (await this.userRepository.findByEmail(dto.email) !== null) {
      console.error(`${dto.email}: already registered`);
      throw new EmailAlreadyRegisteredError(dto.email);
    }

    const hashed = await hashPassword(dto.password);

    const newUser = {
      email: dto.email,
      passwordHash: hashed,
      createdAt: new Date()
    }

    const savedUser: User | null = await this.userRepository.createUser(newUser);
    if (!savedUser) throw new UserUndefinedError();

    return { user: savedUser };
  }
}
