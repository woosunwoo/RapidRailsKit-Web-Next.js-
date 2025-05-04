// src/app/projects/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { get } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { toast } from "sonner";

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function ShowProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`/projects/${id}`)
      .then(setProject)
      .catch(() => {
        toast.error("Project not found");
        router.push("/projects");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;

  if (!project) return null;

  return (
    <main className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p className="text-gray-700">{project.description}</p>
      <Link href={`/projects/${project.id}/edit`}>
        <Button>Edit</Button>
      </Link>
    </main>
  );
}
