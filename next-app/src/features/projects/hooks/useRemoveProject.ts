"use client";

import { useState } from "react";
import { ProjectCtxType } from "../contexts/context";
import { removeProjectAction } from "@/server/project/actions";
import { ResponseErrorName } from "@/schemas/error";
import { Project } from "@/schemas/project";


type Hook = ProjectCtxType["remove"];

const errorMap: Partial<Record<ResponseErrorName, string>> = {
  "UnAuthorizedError": "ユーザーが認証されていません",
  "AuthError": "ユーザーが認証されていません",
  "InvalidRequestDataError": "入力情報が正しくありません"
}


export const useRemoveProject = (sync: ProjectCtxType["sync"]["sync"]): Hook => {
  const [status, setStatus] = useState<Hook["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<Hook["errorMessage"]>(null);

  const reset = () => {
    setStatus("idle");
    setErrorMessage(null);
  }

  const remove = async (id: Project["id"]) => {
    reset();
    setStatus("pending");

    try {
      const result = await removeProjectAction(id);

      if (!result.success) {
        setErrorMessage(errorMap[result.errorName] ?? "エラーが発生しました");
        setStatus("error");
        return null;
      }

      setStatus("success");
      await sync();
      return result.data;
    } catch {
      setErrorMessage("エラーが発生しました");
      setStatus("error");
      return null;
    }
  }


  return { status, errorMessage, reset, remove }
}
