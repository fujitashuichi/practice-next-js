"use server";

import { AppHeader } from "@/components";
import DashBoard from "./Dashboard";

export default async function Page() {
  return <DashBoard header={<AppHeader />} />
}
