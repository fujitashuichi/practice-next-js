"use server";

import { signOut } from "@/auth";
import { AppButton } from "@/components/client";


export async function SignoutButton() {
  return (
    <form
      className="m-0 p-0"
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }
    }>
      <AppButton variant="danger" type="submit">
        Sign out
      </AppButton>
    </form>
  )
}
