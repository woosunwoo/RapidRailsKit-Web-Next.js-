// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authSchema } from "@/lib/zodSchemas";
import { post } from "@/lib/api";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = authSchema.safeParse(form);
    if (!result.success) return setError("Invalid input");

    try {
      setLoading(true);
      const res = await post<{ user: typeof form }, { token: string; user: { id: number; email: string } }>("/signup", {
        user: form,
      });
            
      if (res.token) {
        localStorage.setItem("token", res.token);
        toast.success("Signup successful");
        router.push("/dashboard");
      } else {
        toast.error("Signup succeeded but token missing");
        console.warn("No token in response:", res);
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
