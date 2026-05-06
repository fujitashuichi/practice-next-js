"use client";

import React, { useState } from "react";
import { ProjectCtxType } from "../contexts/context";
import { updateProjectAction } from "@/server/project/actions";
import { ResponseErrorName } from "@/schemas/error";
import { Project } from "@/schemas/project";


type Hook = ProjectCtxType["update"];

const errorMap: Partial<Record<ResponseErrorName, string>> = {
  "UnAuthorizedError": "ユーザーが認証されていません",
  "AuthError": "ユーザーが認証されていません",
  "InvalidRequestDataError": "入力情報が正しくありません"
}


export const useUpdateProject = (sync: ProjectCtxType["sync"]["sync"]): Hook => {
  const [status, setStatus] = useState<Hook["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<Hook["errorMessage"]>(null);

  const reset = () => {
    setStatus("idle");
    setErrorMessage(null);
  }

  const update = async (e: React.SubmitEvent<HTMLFormElement>, id: Project["id"]) => {
    e.preventDefault();

    reset();
    setStatus("pending");

    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateProjectAction(formData, id);

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


  return { status, errorMessage, reset, update }
}
