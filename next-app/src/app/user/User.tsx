import { UserCard } from "@/features/user/components/UserCard";


export function User() {
  return (
    <div className="pt-10 flex flex-col">
      <h1 className="text-2xl mx-auto mb-4 font-bold">ユーザーページ</h1>
      <UserCard />
    </div>
  )
}
