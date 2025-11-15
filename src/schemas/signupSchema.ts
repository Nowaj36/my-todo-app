import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .regex(/^[A-Za-z\s]+$/, "Please type a valid name format"),
    lastName: z
      .string()
      .regex(/^[A-Za-z\s]+$/, "Please type a valid name format"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "4 characters minimum"),
    confirmPassword: z.string().min(4, "4 characters minimum"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
