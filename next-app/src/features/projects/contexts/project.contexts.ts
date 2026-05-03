import { Project } from "@/schemas/project";
import React, { createContext, useContext, type SetStateAction } from "react";


type Status = "idle" | "pending" | "error" | "success";


/* 各Hookの型定義 ↓ */

type ProjectsData = {
  projects: Project[],
  setProjects: React.Dispatch<SetStateAction<Project[]>>
}

type GetProjects = {
  status: Status,
  errorMessage: string | null,
  get: () => Promise<void>
}

type Create = {
  status: Status,
  errorMessage: string | null,
  create: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>,
  reset: () => void
};

type Update = {
  status: Status,
  errorMessage: string | null,
  update: (e: React.SubmitEvent<HTMLFormElement>, id: Project["id"]) => Promise<void>
  reset: () => void
};

type Delete = {
  status: Status,
  errorMessage: string | null,
  delete: (id: Project["id"]) => Promise<void>
  reset: () => void
};

/* ↑各Hookの型定義 */


export type ProjectCtxType = {
  projectsData: ProjectsData, getProjects: GetProjects, create: Create, update: Update, delete: Delete
};


export const ProjectCtx = createContext<ProjectCtxType | null>(null);

export const useProject = () => {
  const ctx = useContext(ProjectCtx);
  if (ctx === null) throw new Error("Context must be used within Provider");
  return ctx;
}
