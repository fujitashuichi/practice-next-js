import { auth } from "@/auth";
import { AppButton } from "@/components";
import Link from "next/link";

export async function UserCard() {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;


  return (<>
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email address</h2>
              <p className="text-lg font-medium text-slate-900 break-all">{user.email}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <Link href="/">
              <AppButton variant="primary" className="w-auto">
                ダッシュボードへ戻る
              </AppButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>)
}
