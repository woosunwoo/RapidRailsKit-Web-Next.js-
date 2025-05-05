"use client";

import * as React from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "default" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  const baseClass = "rounded px-4 py-2 text-sm font-medium transition";
  const variantClass =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
      : "bg-black text-white hover:bg-gray-900";

  return (
    <button className={clsx(baseClass, variantClass, className)} {...props} />
  );
};
