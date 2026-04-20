import { userMock } from "@/__mock__/userMock";
import { AppHeader } from "@/components/AppHeader";
import { ProjectList } from "@/features";

export function Projects() {
  /* original → /
  const { useUser } = useAuth();
  const { user } = useUser;
  /* ← original */

  /* mock → */
  const user = userMock;
  /* ← mock */

  return (
    <div>
      <AppHeader user={user} />
      <ProjectList />
    </div>
  )
}
