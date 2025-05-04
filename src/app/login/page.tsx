"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authSchema } from "@/lib/zodSchemas";
import { post } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = authSchema.safeParse(form);
    if (!result.success) {
      return setError("Invalid email or password format");
    }

    try {
      setLoading(true);
      const res = await post<{ token: string; user: any }>("/login", {
        user: form,
      });
      localStorage.setItem("token", res.token);
      router.push("/"); // You can redirect to a dashboard or project list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">Log In</h2>
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
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
