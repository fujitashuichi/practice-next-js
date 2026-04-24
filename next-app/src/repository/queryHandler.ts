
/* prisma 使用時のエラーハンドリングを共通化したもの */

import { logger } from "@/tools/log";

// queryFn に具体的なDB操作を設定する
// errorHandler にはログ出力などの限定的な処理を設定する（任意）


type HandlerProps<T> = {
  queryFn: () => Promise<T>,
  onError?: (err: unknown) => void
}

export const queryHandler = <T>({
  queryFn,
  onError
}: HandlerProps<T>) => {
  return async () => {
    try {
      return await queryFn();
    } catch (err) {
      if (onError) {
        onError(err);
      }

      throw err;
    }
  }
}
