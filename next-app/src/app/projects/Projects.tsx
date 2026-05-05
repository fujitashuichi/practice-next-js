import { ProjectList } from "@/features/projects/components/ProjectList";
import { SyncProjectsBoundary } from "@/features/projects/components/SyncProjectsBoundary";

export function Projects() {
  return (
    <SyncProjectsBoundary>
      <ProjectList />
    </SyncProjectsBoundary>
  )
}
