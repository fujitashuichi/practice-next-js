"use server";

import { signOut } from "@/auth";
import { AppButton } from "@/components";


export async function SignoutButton() {
  return (
    <AppButton variant="danger" type="submit" onClick={async () => {
      "use server"
      await signOut({ redirectTo: "/" })
    }}>
      Sign out
    </AppButton>
  )
}
