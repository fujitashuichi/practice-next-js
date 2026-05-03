import { useState } from "react";
import { ProjectCtxType } from "../contexts/project.contexts";

type Result = ProjectCtxType["projectsData"];

export const useProjectsData = (): Result => {
  const [projects, setProjects] = useState<Result["projects"]>([]);

  return { projects, setProjects };
}
