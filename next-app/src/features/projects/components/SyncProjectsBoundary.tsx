"use client";

import React from 'react'
import { useProjectHooks } from '../contexts/context';
import { AppButton } from '@/components/AppButton';
import { AppLoadingBar } from '@/components/AppLoadingBar';


export function SyncProjectsBoundary({ children }: { children: React.ReactNode }) {
  const { sync: syncProjectsHook } = useProjectHooks();
  const { sync, status, errorMessage } = syncProjectsHook;


  return (<>
    {
      (status === "idle" || status === "pending") && <AppLoadingBar />

    }
    {
      status === "error" && <>
        <h1>{errorMessage}</h1>
        <AppButton variant="primary" onClick={sync}>
          プロジェクト再取得
        </AppButton>
      </>
    }
    {
      status === "success" && <>{children}</>
    }
  </>)
}
