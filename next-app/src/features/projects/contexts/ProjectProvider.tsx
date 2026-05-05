"use client";

import { useEffect } from "react";
import { useCreateProject } from "../hooks/useCreateProject";
import { useProjects } from "../hooks/useProjects";
import { useRemoveProject } from "../hooks/useRemoveProject";
import { useSyncProjects } from "../hooks/useSyncProjects";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { ProjectCtx, ProjectCtxType } from "./context";
import { logger } from "@/tools/log";

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const projectsHook = useProjects();
  const syncProjectHook = useSyncProjects(projectsHook.setProjects);

  const { sync } = syncProjectHook;
  const createProjectHook = useCreateProject(sync);
  const updateProjectHook = useUpdateProject(sync);
  const removeProjectHook = useRemoveProject(sync);

  const contexts: ProjectCtxType = {
    projects: projectsHook,
    sync: syncProjectHook,
    create: createProjectHook,
    update: updateProjectHook,
    remove: removeProjectHook
  }

  useEffect(() => {
    const sync = async () => {
      logger.trace("now syncing projects...");
      await syncProjectHook.sync();
      logger.trace("syncing projects finished.");
    }

    sync();
  }, []);

  return (
    <ProjectCtx.Provider value={contexts}>
      {children}
    </ProjectCtx.Provider>
  )
}
