import { AppHeaderMain } from "./internal/AppHeaderMain";
import { ProjectsCard } from "./internal/ProjectsCard";


export async function AppHeader() {
  return <AppHeaderMain projectsCard={<ProjectsCard />} />
}
