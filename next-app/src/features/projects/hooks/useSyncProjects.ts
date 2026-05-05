"use client";

import { useState } from "react";
import { ProjectCtxType } from "../contexts/context"
import { ResponseErrorName } from "@/schemas/error";
import { Project } from "@/schemas/project";
import { getUsersProjectsAction } from "@/server/project/actions";


type Hook = ProjectCtxType["sync"];

const errorMap: Partial<Record<ResponseErrorName, string>> = {
  "UnAuthorizedError": "ユーザーが認証されていません",
  "AuthError": "ユーザーが認証されていません",
  "InvalidRequestDataError": "入力情報が正しくありません"
}


export const useSyncProjects = (setProjects: ProjectCtxType["projects"]["setProjects"]): Hook => {
  const [status, setStatus] = useState<Hook["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<Hook["errorMessage"]>(null);


  const reset = () => {
    setStatus("idle");
    setErrorMessage(null);
  }

  const sync = async (userId: Project["userId"]) => {
    reset();
    setStatus("pending");

    try {
      const result = await getUsersProjectsAction(userId);

      if (!result.success) {
        setErrorMessage(errorMap[result.errorName] ?? "エラーが発生しました");
        setStatus("error");
        return;
      }

      setStatus("success");
      setProjects(result.data);
    } catch {
      setErrorMessage("エラーが発生しました");
      setStatus("error");
    }
  }


  return { status, errorMessage, reset, sync }
}
