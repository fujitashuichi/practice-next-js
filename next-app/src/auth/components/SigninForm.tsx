"use server";

import { signIn } from "@/auth"

async function handleSignIn() {
  await signIn("github", { redirectTo: "/" })
}

export async function SigninForm() {
  return (
    <form action={handleSignIn}>
      <button type="submit">
        Signin with GitHub
      </button>
    </form>
  )
}
