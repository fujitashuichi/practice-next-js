import Link from "next/link";
import { projectsMock } from "@/__mock__/projects.Mock";
import { auth } from "@/auth";
import { SignoutButton } from "@/auth/components";
import { AppButton } from "./AppButton";


export async function AppHeader() {
  /* original → /
  const { projectsData } = useProject();
  const { projects } = projectsData;
  /* ← original */

  /* mock → */
  const projects = projectsMock;
  /* ← mock */


  const session = await auth();
  const user = session?.user;

  if (!user) return null;


  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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

        <div className="flex gap-x-2">
          <Link href={"/"}>
            <AppButton variant="primary" className="w-auto bg-green-400">
              Dashboard
            </AppButton>
          </Link>
          <SignoutButton />
        </div>
      </nav>
    </header>
  )
}
