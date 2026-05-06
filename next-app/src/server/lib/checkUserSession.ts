import { auth } from "@/auth";
import { User } from "@/schemas/user";
import { logger } from "@/tools/log";


type Result =
  | { isSession: false }
  | { isSession: true, userId: User["id"] }


export const checkUserSession = async (): Promise<Result> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    logger.warn("userId not found.");
    return {
      isSession: false
    }
  }


  return {
    isSession: true,
    userId
  }
}