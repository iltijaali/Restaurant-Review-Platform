import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
  role: z.enum(["owner", "reviewer"], {
    error: "Please select a role.",
  }),
});

export type RegisterSchema = z.infer<
  typeof registerSchema
>;
