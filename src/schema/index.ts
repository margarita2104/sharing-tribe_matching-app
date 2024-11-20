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
    image: z.union([z.instanceof(File), z.string()]).optional(),
    jobRoleFamily: z.optional(
      z.enum([
        "SoftwareDevelopment",
        "Design",
        "ProductManagement",
        "DataScience",
        "DevOps",
        "QualityAssurance",
        "Engineering",
        "Other",
      ]),
    ),
    employmentStatus: z.optional(
      z.enum(["Freelance", "FullTime", "PartTime", "OpenToOpportunities"]),
    ),
    workMode: z.optional(z.enum(["Hybrid", "Remote", "Onsite"])),

    availability: z.optional(z.enum(["OneMonth", "ThreeMonths", "SixMonths"])),
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

export const WorkExperienceSchema = z
  .object({
    jobTitle: z.string().min(1, {
      message: "First Name is required.",
    }),
    companyName: z.string().min(1, {
      message: "Last Name is required.",
    }),
    userId: z.string(),

    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End Date must be greater than Start Date.",
    path: ["endDate"],
  });
export const EducationSchema = z.object({
  degree: z.string().min(1, {
    message: "First Name is required.",
  }),
  fieldOfStudy: z.string().min(1, {
    message: "Last Name is required.",
  }),
  institution: z.string().min(1, {
    message: "Last Name is required.",
  }),
  graduationYear: z.string().optional(),
  userId: z.string(),
});
export const TechSkillsSchema = z.object({
  name: z.string().min(4, {
    message: "A skill name is required.",
  }),

  userId: z.string(),
});
export const SoftSKilsSchema = z.object({
  name: z.string().min(4, {
    message: "A soft skill is required.",
  }),

  userId: z.string(),
});

export const JobPreferenceSchema = z.object({
  workPreference: z.array(
    z.enum(["FullTime", "PartTime", "JobSharing", "Hybrid", "Remote"]),
  ),
  role: z.array(
    z.enum([
      "FrontendDeveloper",
      "BackendDeveloper",
      "FullstackDeveloper",
      "MobileDeveloper",
      "Designer",
      "ProductManager",
      "DataScientist",
      "DevOpsEngineer",
      "QAEngineer",
      "SoftwareEngineer",
      "Other",
    ]),
  ),
  industry: z.array(
    z.enum([
      "IT",
      "Media",
      "Education",
      "Health",
      "Finance",
      "Retail",
      "Other",
    ]),
  ),
  userId: z.string(),
});
export const WorkTandemSchema = z.object({
  idealPartnerRole: z.array(
    z.enum([
      "FrontendDeveloper",
      "BackendDeveloper",
      "FullstackDeveloper",
      "MobileDeveloper",
      "Designer",
      "ProductManager",
      "DataScientist",
      "DevOpsEngineer",
      "QAEngineer",
      "SoftwareEngineer",
      "Other",
    ]),
  ),
  complementarySkills: z.array(z.string()),
  userId: z.string(),
});

export const ReferencesSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  relationship: z.string().min(1, {
    message: "Relationship is required.",
  }),
  company: z.string().min(1, {
    message: "Company is required.",
  }),
  contactInfo: z.string().min(1, {
    message: "Contact info is required.",
  }),
  userId: z.string(),
});

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
