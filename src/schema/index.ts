import { z } from "zod";

export const ProfileSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    location: z.optional(
      z.string().min(2, { message: "Location requires at least 2 characters" }),
    ),
    linkedinUrl: z.optional(z.string().min(6)),
    githubUrl: z.optional(z.string().min(6)),
    bio: z.optional(
      z.string().min(6, { message: "Bio requires at least 6 characters" }),
    ),
    jobTitle: z.optional(
      z.string().min(1, { message: "Job title is required" }),
    ),
    image: z.union([z.instanceof(File), z.string()]).optional(),
    jobRoleFamily: z.optional(
      z.enum([
        "Software_Development",
        "Data",
        "Fintech",
        "Design",
        "Sales_Marketing",
        "Product_Managment",
        "Scrum_Master",
        "Other",
      ]),
    ),
    employmentStatus: z.optional(
      z.enum(["Freelance", "Full_Time", "Part_Time", "Open_to_opportunities"]),
    ),
    workMode: z.optional(z.enum(["Hybrid", "Remote", "On_site"])),

    availability: z.optional(
      z.enum(["One_Month", "Three_Months", "Six_Months"]),
    ),
    currentCompany: z.optional(z.string()),

    discTestResult: z.optional(z.enum(["D", "I", "S", "C"])),
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

export const SettingsSchema = z
  .object({
    marketingEmails: z.boolean().default(false),
    profileVisibility: z.boolean().default(true),
    receiveMarketingEmails: z.boolean().default(false),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
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
      message: "Job title is required.",
    }),
    companyName: z.string().min(1, {
      message: "Company name is required.",
    }),
    userId: z.string(),

    startDate: z.string().min(1, { message: "Start Date is required." }),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.endDate === "Present") {
        return true;
      }
      if (!data.endDate) {
        return false;
      }
      return new Date(data.endDate) > new Date(data.startDate);
    },
    {
      message: "End Date must be greater than Start Date.",
      path: ["endDate"],
    },
  );
export const EducationSchema = z.object({
  degree: z.string().min(1, {
    message: "Degre or Certification is required.",
  }),
  fieldOfStudy: z.string().min(1, {
    message: "Field of study is required.",
  }),
  institution: z.string().min(1, {
    message: "Institution is required.",
  }),
  graduationYear: z.string().optional(),
  userId: z.string(),
});
export const TechSkillsSchema = z.object({
  name: z.string().min(4, {
    message: "A tech skill is required.",
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
    z.enum(["Full_Time", "Part_Time", "Job_Sharing", "Hybrid", "Remote"]),
  ),
  role: z.array(
    z.enum([
      "Frontend_Developer",
      "Backend_Developer",
      "Fullstack_Developer",
      "Mobile_Developer",
      "Designer",
      "Product_Manager",
      "Data_Scientist",
      "DevOps_Engineer",
      "QA_Engineer",
      "Software_Engineer",
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

// ZOD SCHEMA
export const ProjectSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  role: z.string().min(1, {
    message: "Role is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  link: z.string().min(1, {
    message: "Link is required.",
  }),
  projectImage: z.union([z.instanceof(File), z.string()]).optional(),

  userId: z.string(),
});

export const WorkTandemSchema = z.object({
  idealPartnerRole: z.array(
    z.enum([
      "Frontend_Developer",
      "Backend_Developer",
      "Fullstack_Developer",
      "Mobile_Developer",
      "Designer",
      "Product_Manager",
      "Data_Scientist",
      "DevOps_Engineer",
      "QA_Engineer",
      "Software_Engineer",
      "Other",
    ]),
  ),
  complementarySkills: z.array(z.string()),
  userId: z.string(),
});

export const AdditionalInfoSchema = z.object({
  hobbiesAndInterests: z.array(z.string()),
  volunteering: z.string().optional(),
  preferredWorkSchedule: z.enum([
    "Flexible_Hours",
    "Fixed_Hours",
    "Full_Time",
    "Part_Time",
    "Job_Sharing",
  ]),

  languages: z.array(
    z.object({
      name: z.string().min(1, { message: "Language is required." }),
      proficiency: z.enum([
        "Mother Tongue",
        "Fluent",
        "Intermediate",
        "Beginner",
      ]),
    }),
  ),
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
  password: z.string().min(6, {
    message: "Minimum of 6 characters required.",
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
