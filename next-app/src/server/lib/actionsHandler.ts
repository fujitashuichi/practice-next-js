import { ResponseErrorName } from "@/schemas/error";
import { InvalidRequestDataError } from "../error";


type Result<T> =
  | { success: true, data: T }
  | { success: false, errorName: ResponseErrorName }


export const actionHandler = async <T>({ action }: {
  action: () => Promise<T>
}): Promise<Result<T>> => {
  try {
    const data = await action();

    return {
      success: true,
      data
    }
  } catch(err) {
    if (err instanceof InvalidRequestDataError) {
      return {
        success: false,
        errorName: "InvalidRequestDataError"
      }
    }
    return {
      success: false,
      errorName: "InternalServerError"
    };
  }
}
