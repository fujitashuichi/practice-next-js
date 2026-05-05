"use client";

import { Project } from "@/schemas/project";
import React, { createContext, useContext, type SetStateAction } from "react";


type Status = "idle" | "pending" | "error" | "success";


/* 各Hookの型定義 ↓ */

type Projects = {
  projects: Project[],
  setProjects: React.Dispatch<SetStateAction<Project[]>>
}

type Sync = {
  status: Status,
  errorMessage: string | null,
  sync: () => Promise<void>,
  reset: () => void
}

type Create = {
  status: Status,
  errorMessage: string | null,
  create: (formData: FormData) => Promise<Project | null>,
  reset: () => void
};

type Update = {
  status: Status,
  errorMessage: string | null,
  update: (formData: FormData, id: Project["id"]) => Promise<Project | null>
  reset: () => void
};

type Remove = {
  status: Status,
  errorMessage: string | null,
  remove: (id: Project["id"]) => Promise<Project | null>
  reset: () => void
};

/* ↑各Hookの型定義 */


export type ProjectCtxType = {
  projects: Projects, sync: Sync, create: Create, update: Update, remove: Remove
};


export const ProjectCtx = createContext<ProjectCtxType | null>(null);

export const useProjectHooks = () => {
  const ctx = useContext(ProjectCtx);
  if (ctx === null) throw new Error("Context must be used within Provider");
  return ctx;
}
