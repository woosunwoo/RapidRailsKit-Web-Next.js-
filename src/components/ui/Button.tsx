// src/components/ui/Button.tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: Props) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition",
        className
      )}
      {...props}
    />
  );
}
