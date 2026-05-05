import Link from "next/link";
import { auth } from "@/auth";
import { SignoutButton } from "@/auth/components";
import { AppButton } from "../AppButton";
import React from "react";


export async function AppHeaderMain({ projectsCard }: { projectsCard: React.ReactNode }) {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;


  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {projectsCard}

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
