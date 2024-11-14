import { z } from "zod";

export const ProfileSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    location: z.optional(z.string().min(6)),
    linkedinUrl: z.optional(z.string().min(6)),
    githubUrl: z.optional(z.string().min(6)),
    bio: z.optional(z.string().min(6)),
    jobTitle: z.optional(z.string().min(6)),
    jobRoleFamily: z.optional(z.string().min(6)),
    employmentStatus: z.optional(
      z.enum(["Freelance", "FullTime", "PartTime", "OpenToOpportunities"]),
    ),
    workMode: z.optional(z.enum(["Hybrid", "Remote", "Onsite"])),

    availability: z.optional(z.string().min(6)),
    currentCompany: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

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

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
