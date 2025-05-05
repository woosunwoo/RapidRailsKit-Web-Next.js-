"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
