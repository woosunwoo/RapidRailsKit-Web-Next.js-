// src/components/ui/Card.tsx
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("p-6 bg-white rounded-2xl shadow-md", className)}>
      {children}
    </div>
  );
}
