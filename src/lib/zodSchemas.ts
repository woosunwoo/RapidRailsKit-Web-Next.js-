// src/lib/zodSchemas.ts
import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const projectSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});
  
export type ProjectForm = z.infer<typeof projectSchema>;