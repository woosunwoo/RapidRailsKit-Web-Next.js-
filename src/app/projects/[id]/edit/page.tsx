"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { get, put } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type ProjectResponse = {
    id: number;
    name: string;
    description: string;
  };  

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    get<ProjectResponse>(`/projects/${id}`)
      .then((res) => setForm({ name: res.name, description: res.description }))
      .catch(() => {
        toast.error("Project not found");
        setError("Failed to load project");
      })
      .finally(() => setLoading(false));
  }, [id]);
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
  
    await toast.promise(
      put(`/projects/${id}`, { project: form }).then(() => {
        router.push("/projects");
      }),
      {
        loading: "Updating...",
        success: "Project updated",
        error: "Failed to update project",
      }
    );
  }  

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={form.name}
          placeholder="Project Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          type="text"
          value={form.description}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit">Update</Button>
      </form>
    </main>
  );
}
