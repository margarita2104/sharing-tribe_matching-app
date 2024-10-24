import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: "First Name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});
export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});
