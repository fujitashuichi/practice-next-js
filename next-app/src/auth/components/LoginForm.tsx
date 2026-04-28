import { signIn } from "@/auth"
import { AppButton } from "@/components"

export function SigninForm() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <AppButton variant="primary">
        Signin with GitHub
      </AppButton>
    </form>
  )
}
