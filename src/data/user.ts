import { db } from "../server/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: { id },
      include: {
        workExperiences: true,
        education: true,
        technicalSkills: true,
        softSkills: true,
        jobPreferences: true,
        tandemPreferences: true,
        references: true,
        projects: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};
