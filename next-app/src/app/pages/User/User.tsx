"use client"

import { AppButton } from "@/components";
import { AppLoadingBar } from "@/components/AppLoadingBar";
import { UserCard } from "@/features";
import Link from "next/link";

export function User() {
  /* original → /
  const { session } = useAuth();
  const { status } = session;
  /* ← original */


  /* mock → */
  const [status,] = "idle";
  /* ← mock */


  return (<>
    {status === "idle" &&
      <AppLoadingBar />
    }

    {status === "inactive" &&
      <>
        <h1>セッションが停止しています</h1>
        <Link href="login">
          <AppButton variant="primary" className="w-auto">
            再ログイン
          </AppButton>
        </Link>
      </>
    }

    {status === "active" &&
      <div className="pt-10 flex flex-col">
        <h1 className="text-2xl mx-auto mb-4 font-bold">ユーザーページ</h1>
        <UserCard />
      </div>
    }
  </>)
}
