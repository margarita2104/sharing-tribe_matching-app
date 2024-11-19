"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "../server/db";
import { getUserByEmail, getUserById } from "~/data/user";
import { currentUser } from "../lib/auth";
import { generateVerificationToken } from "~/lib/tokens";
import { sendVerificationEmail } from "~/lib/mail";
import {
  type WorkExperienceSchema,
  type ProfileSchema,
  type EducationSchema,
  type TechSkillsSchema,
  type SoftSKilsSchema,
  type JobPreferenceSchema,
} from "~/schema";
import { revalidatePath } from "next/cache";

export const ProfileUpdate = async (values: z.infer<typeof ProfileSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  if (!user.id) {
    return { error: "Unauthorized" };
  }
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  revalidatePath("/profile");

  return { success: "Profile Updated!" };
};

export const WorkUpdate = async (
  values: z.infer<typeof WorkExperienceSchema>,
  id: number,
) => {
  const user = await currentUser();

  if (!user?.email) {
    throw new Error("User email not found");
  }
  const dbWorkExperience = await db.workExperience.findUnique({
    where: { id },
  });

  if (!dbWorkExperience) {
    throw new Error("Work Experience not found");
  }

  if (!user) {
    throw new Error("User not authenticated");
  }

  await db.workExperience.update({
    where: { id },
    data: values,
  });

  revalidatePath("/profile");

  return { success: "Work Updated", error: "Oh no something went wrong" };
};
export const WorkCreate = async (
  values: z.infer<typeof WorkExperienceSchema>,
) => {
  console.log("Received Values: ", values);
  await db.workExperience.create({ data: values });

  revalidatePath("/profile");

  return {
    success: "Work experience added!",
    error: "Oh no something went wrong",
  };
};

export const getWorkExperience = async (id: string) => {
  const workExperience = await db.workExperience.findMany({
    where: { userId: id },
    orderBy: { startDate: "desc" },
  });

  return workExperience;
};
// EDUCATION CERTIFICATION

export const EducationUpdate = async (
  values: z.infer<typeof EducationSchema>,
  id: number,
) => {
  const user = await currentUser();

  if (!user?.email) {
    throw new Error("User email not found");
  }
  const dbEducation = await db.education.findUnique({
    where: { id },
  });

  if (!dbEducation) {
    throw new Error("Education not found");
  }

  if (!user) {
    throw new Error("User not authenticated");
  }

  await db.education.update({
    where: { id },
    data: values,
  });

  revalidatePath("/profile");

  return { success: "Education Updated", error: "Oh no something went wrong" };
};
export const EducationCreate = async (
  values: z.infer<typeof EducationSchema>,
) => {
  await db.education.create({ data: values });

  revalidatePath("/profile");

  return {
    success: "Education added!",
    error: "Oh no something went wrong",
  };
};

export const getEducation = async (id: string) => {
  const educations = await db.education.findMany({
    where: { userId: id },
    orderBy: { graduationYear: "desc" },
  });

  return educations;
};

// TECH SKILLS

export const TechSkillCreate = async (
  values: z.infer<typeof TechSkillsSchema>,
) => {
  await db.technicalSkills.create({ data: values });

  revalidatePath("/profile");

  return {
    success: "Tech skill added!",
    error: "Oh no something went wrong",
  };
};
export const TechSkillDelete = async (id: number) => {
  await db.technicalSkills.delete({ where: { id } });

  revalidatePath("/profile");

  return {
    success: "Tech skill deleted!",
    error: "Oh no something went wrong",
  };
};

export const getTechnicalSkills = async (id: string) => {
  const techSkills = await db.technicalSkills.findMany({
    where: { userId: id },
  });

  return techSkills;
};

// SOFT SKILLS
export const SoftSkillCreate = async (
  values: z.infer<typeof SoftSKilsSchema>,
) => {
  await db.softSkills.create({ data: values });

  revalidatePath("/profile");

  return {
    success: "Soft skill added!",
    error: "Oh no something went wrong",
  };
};

export const SoftSkillDelete = async (id: number) => {
  await db.softSkills.delete({ where: { id } });

  revalidatePath("/profile");

  return {
    success: "Soft skill deleted!",
    error: "Oh no something went wrong",
  };
};

export const getSoftSkills = async (id: string) => {
  const softSkills = await db.softSkills.findMany({
    where: { userId: id },
  });

  return softSkills;
};

// JOB PREFERENCES

export const JobPreferenceCreate = async (
  values: z.infer<typeof JobPreferenceSchema>,
) => {
  const uniqueRoles = [...new Set(values.role)];
  const uniquePreference = [...new Set(values.workPreference)];
  const uniqueIndustry = [...new Set(values.industry)];
  await db.jobPreference.create({
    data: {
      ...values,
      role: uniqueRoles,
      workPreference: uniquePreference,
      industry: uniqueIndustry,
    },
  });

  revalidatePath("/profile");

  return {
    success: "Job preference added!",
    error: "Oh no something went wrong",
  };
};
export const JobPreferenceUpdate = async (
  values: z.infer<typeof JobPreferenceSchema>,
  id: number,
) => {
  try {
    const updatedJobPreference = await db.jobPreference.updateMany({
      where: { id },
      data: {
        workPreference: {
          push: values.workPreference,
        },
        role: {
          push: values.role,
        },
        industry: {
          push: values.industry,
        },
      },
    });
    revalidatePath("/profile");

    return { success: "Job Preference updated!", updatedJobPreference };
  } catch (error) {
    console.error("Error updating job preference:", error);
    return { error: "Failed to update job preference" };
  }
};

export const JobPreferenceDelete = async (
  id: number,
  field: "role" | "workPreference" | "industry",
  index: number,
) => {
  try {
    // Fetch the current job preference
    const jobPreference = await db.jobPreference.findUnique({
      where: { id },
    });

    if (!jobPreference) {
      throw new Error("Job preference not found");
    }

    const currentArray = jobPreference[field] || [];

    const updatedArray = currentArray.filter((_, i) => i !== index);

    await db.jobPreference.update({
      where: { id },
      data: {
        [field]: updatedArray,
      },
    });

    revalidatePath("/profile");

    return {
      success: "Job preference updated successfully!",
    };
  } catch (error) {
    console.error("Error deleting item from job preference:", error);
    return {
      error: "Failed to delete item from job preference",
    };
  }
};

export const getJobPreferences = async (id: string) => {
  const jobPreferences = await db.jobPreference.findFirst({
    where: { userId: id },
  });

  return jobPreferences;
};
