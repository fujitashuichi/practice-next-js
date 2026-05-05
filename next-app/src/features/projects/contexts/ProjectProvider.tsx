"use client";

import { useEffect } from "react";
import { useCreateProject } from "../hooks/useCreateProject";
import { useProjects } from "../hooks/useProjects";
import { useRemoveProject } from "../hooks/useRemoveProject";
import { useSyncProjects } from "../hooks/useSyncProjects";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { ProjectCtx, ProjectCtxType } from "./context";

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const projectHook = useProjects();
  const syncProjectHook = useSyncProjects(projectHook.setProjects);

  const contexts: ProjectCtxType = {
    projects: projectHook,
    sync: syncProjectHook,
    create: useCreateProject(),
    update: useUpdateProject(),
    remove: useRemoveProject(),
  }

  useEffect(() => {
    syncProjectHook.sync();
  }, [])

  return (
    <ProjectCtx.Provider value={contexts}>
      {children}
    </ProjectCtx.Provider>
  )
}
