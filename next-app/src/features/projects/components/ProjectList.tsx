"use client";

import Link from "next/link";
import { CreateProjectForm } from "./internal/CreateProjectForm";
import { useProjectHooks } from "../contexts/context";

export function ProjectList() {
  const { projects: projectsHook } = useProjectHooks();
  const { projects } = projectsHook;


  return (
    <section className="p-4 flex flex-col">
      <h1 className="mx-auto text-xl font-bold mb-4">Project 一覧</h1>

      {projects.length === 0 && (
        <div className="mx-auto">
          <p className="text-gray-500">プロジェクトがありません。新しく作成してください。</p>
          <CreateProjectForm />
        </div>
      )}

      {projects.length > 0 && (
        <div className="mx-auto">
          <div className="mb-5">
            <CreateProjectForm />
          </div>
          <ul className="space-y-3">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border rounded shadow-sm bg-white">
                <Link href={`/projects/${project.id}`}>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                  <div className="mt-2 text-xs text-gray-400">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
