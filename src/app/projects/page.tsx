"use client";

import { useEffect, useState } from "react";
import { get, del as destroy } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner"; // or "@/components/ui/use-toast" if using v0 version

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await get("/projects");
      setProjects(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  async function handleDelete(id: number) {
    try {
      await destroy(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete project");
    }
  }

  return (
    <main className="p-8">
      <Link href="/projects/new" className="text-blue-600 underline">
        + New Project
      </Link>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 rounded shadow-sm">
              <Link href={`/projects/${project.id}`}>
                <h2 className="text-xl font-semibold hover:underline">{project.name}</h2>
              </Link>

              <p className="text-gray-600">{project.description}</p>
              <div className="flex gap-2 mt-2">
                <Link href={`/projects/${project.id}/edit`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => handleDelete(project.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
