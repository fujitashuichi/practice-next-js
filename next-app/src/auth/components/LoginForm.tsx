"use server";

import { signIn } from "@/auth"

export async function SigninForm() {
  return (
    <form
      action={async () => {
        await signIn("github", { redirectTo: "/" })
      }}
    >
      <button type="submit">
        Signin with GitHub
      </button>
    </form>
  )
}
