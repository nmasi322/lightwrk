import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is a required value" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must contain at least one number"
    )
    .refine(
      (password) => /[^A-Za-z0-9]/.test(password),
      "Password must contain at least one special character"
    ),
});

export type SignupFormValue = z.infer<typeof signupSchema>;
