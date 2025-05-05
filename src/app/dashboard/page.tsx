"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get } from "@/lib/api";
import { LogoutButton } from "@/components/LogoutButton";


type ProtectedResponse = {
    user: {
      email: string;
    };
};
  

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProtected() {
      try {
        const res = await get<ProtectedResponse>("/protected");
        setUser(res.user); // expects `{ user: email }` from the backend
        console.log("Protected response:", res);
      } catch (err: unknown) {
        console.error(err);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchProtected();
  }, [router]);

  if (loading) {
    return <div className="p-4 text-center">Loading dashboard...</div>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
        <p className="text-lg text-gray-600">Logged in as: {user?.email}</p>

        <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <LogoutButton />
        </div>
      </div>
    </main>
  );
}
