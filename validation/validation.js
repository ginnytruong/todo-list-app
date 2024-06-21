import { z } from "zod";

export const taskSchema = z.object({
  content: z
    .string()
    .min(1, "Task content is required")
    .max(100, "Task content should not exceed 100 characters"),
  completed: z.boolean().optional(),
});

export const todoListSchema = z.object({
  name: z
    .string()
    .min(1, "List name is required")
    .max(50, "List name should not exceed 50 characters"),
});
