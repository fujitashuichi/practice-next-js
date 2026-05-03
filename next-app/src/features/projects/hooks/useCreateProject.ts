import React, { useState } from "react";
import { ProjectCtxType } from "../contexts/project.contexts";
import { parseFormData } from "../lib/parseFormData";
import { CreateProjectPayloadSchema } from "@/server/project/types";
import { ProjectService } from "@/server/project/service/project.service";



const service = new ProjectService();


const errorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  ProjectAlreadyExists: "同名のプロジェクトが既に存在します",
  InvalidData: "正しいデータを取得出来ませんでした",
  Unknown: "エラーが発生しました",
} as const;

type Result = ProjectCtxType["create"];


export const useCreateProject = (reload: ProjectCtxType["getProjects"]["get"]): Result => {
  const [status, setStatus] = useState<Result["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const create: Result["create"] = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData({
      formData,
      schema: CreateProjectPayloadSchema,
      useFor: "create"
    });

    if (!parsed.success) return alert("入力内容に不備があります");

    await service.createProject(parsed.data);

    await reload();  // 情報を更新
  };


  const reset = () => {
    setStatus("idle");
  }


  return { create, reset, status, errorMessage };
}
