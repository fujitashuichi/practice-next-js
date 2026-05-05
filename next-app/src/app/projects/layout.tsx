"use client";

import { AppLoadingBar } from "@/components/AppLoadingBar";
import { useProjectHooks } from "@/features/projects/contexts/context";
import React from "react";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const { sync: syncProjectHook } = useProjectHooks();
  const { status, errorMessage } = syncProjectHook;

  return (<>
    {
      (status === "idle" || status === "pending") && <AppLoadingBar />
    }
    {
      status === "error" && <ErrorUI message={errorMessage ?? "エラーが発生しました"} />
    }
    {
      status === "success" && <>{children}</>
    }
  </>)
}


function ErrorUI({ message }: { message: string }) {
  return (
    <h1>{message}</h1>
  )
}
