import { getWorkExperience } from "~/actions/profile";

export const useWorkExperiences = async (id: string) => {
  const workExperiences = await getWorkExperience(id ?? "");

  return workExperiences;
};
