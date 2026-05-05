"use client";

import { useProjectHooks } from '@/features/projects/contexts/context';
import Link from 'next/link';


export function ProjectsCard() {
  const { projects: projectsHook } = useProjectHooks();
  const { projects } = projectsHook;


  return (
    <ul className="flex gap-8 items-center text-sm font-semibold tracking-tight">
      <li>
        <Link
          href="/user"
          className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">Signed In</span>
        </Link>
      </li>
      <li>
        <Link
          href="/projects"
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <span className="group-hover:underline underline-offset-4">プロジェクト一覧</span>
          <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[11px] font-bold">
            {projects.length ?? 0}
          </span>
        </Link>
      </li>
    </ul>
  )
}
