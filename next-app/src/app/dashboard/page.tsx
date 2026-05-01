import { AppHeader } from "@/components/server";
import DashBoard from "./Dashboard";

export default async function Page() {
  return <DashBoard header={<AppHeader />} />
}
