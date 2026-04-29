import { auth } from "@/auth";
import { Introduction } from "@/components";
import DashBoard from "./Dashboard";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return <Introduction />

  return <DashBoard />
}
