import { User } from "@/schemas";
import { UserRepository } from "../repository";
import { SaveUserPayload } from "../types";
import { EmailAlreadyRegisteredError, UserUndefinedError } from "../error";
import { hashPassword } from "../lib";

export class RegisterService {
  private userRepository = new UserRepository();


  createUser = async (dto: SaveUserPayload): Promise<{ user: User }> => {
    if (await this.userRepository.findByEmail(dto.email) !== null) {
      console.error(`${dto.email}: already registered`);
      throw new EmailAlreadyRegisteredError(dto.email);
    }

    const hashed = await hashPassword(dto.passwordHash);

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
