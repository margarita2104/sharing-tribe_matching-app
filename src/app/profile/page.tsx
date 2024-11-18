import Profile from "./components/profile";
import {
  getEducation,
  getSoftSkills,
  getTechnicalSkills,
  getWorkExperience,
} from "~/actions/profile";
import { currentUser } from "~/lib/auth";

export default async function ProfileMain() {
  const user = await currentUser();
  if (!user) return null;
  const workExperiences = await getWorkExperience(user?.id ?? "");
  const education = await getEducation(user?.id ?? "");
  const techSkills = await getTechnicalSkills(user?.id ?? "");
  const softSkills = await getSoftSkills(user?.id ?? "");
  console.log(techSkills);

  return (
    <Profile
      user={user}
      workExperiences={workExperiences}
      education={education}
      techSkills={techSkills}
      softSkills={softSkills}
    />
  );
}
