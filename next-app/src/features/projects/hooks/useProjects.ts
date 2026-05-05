"use client";

import { useState } from "react"
import { ProjectCtxType } from "../contexts/context";


type Hook = ProjectCtxType["projects"];


export const useProject = (): Hook => {
  const [projects, setProjects] = useState<Hook["projects"]>([]);

  return { projects, setProjects }
}