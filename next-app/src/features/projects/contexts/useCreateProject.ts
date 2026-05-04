"use client";

import { useState } from "react";
import { ProjectCtxType } from "./project.contexts";
import { projectActions } from "@/server/project/actions";
import { ResponseErrorName } from "@/schemas/error";


type Hook = ProjectCtxType["create"];

const errorMap: Partial<Record<ResponseErrorName, string>> = {
  "UnAuthorizedError": "ユーザーが認証されていません",
  "AuthError": "ユーザーが認証されていません",
  "InvalidRequestDataError": "入力情報が正しくありません"
}


export const useCreateProject = (): Hook => {
  const [status, setStatus] = useState<Hook["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<Hook["errorMessage"]>(null);

  const reset = () => {
    setStatus("idle");
    setErrorMessage(null);
  }

  const create = async (formData: FormData) => {
    reset();
    setStatus("pending");

    const result = await projectActions.create(formData);

    if (!result.success) {
      setErrorMessage(errorMap[result.errorName] ?? "エラーが発生しました");
      setStatus("error");
      return null;
    }

    setStatus("success");
    return result.data;
  }


  return { status, errorMessage, reset, create }
}
