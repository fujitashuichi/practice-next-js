import { AppHeader } from "@/components/AppHeader";
import DashBoard from "./Dashboard";

export default async function Page() {
  return <DashBoard header={<AppHeader />} />
}
