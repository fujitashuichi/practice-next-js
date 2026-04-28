import { signIn } from "@/auth"

export function SigninForm() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/" })
      }}
    >
      <button type="submit">
        Signin with GitHub
      </button>
    </form>
  )
}
