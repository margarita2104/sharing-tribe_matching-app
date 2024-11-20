import Profile from "./components/profile";
import {
  getEducation,
  getJobPreferences,
  getSoftSkills,
  getTechnicalSkills,
  getWorkExperience,
  getWorkTandem,
} from "~/actions/profile";
import { currentUser } from "~/lib/auth";

export default async function ProfileMain() {
  const user = await currentUser();
  if (!user) return null;
  const workExperiences = await getWorkExperience(user?.id ?? "");
  const education = await getEducation(user?.id ?? "");
  const techSkills = await getTechnicalSkills(user?.id ?? "");
  const softSkills = await getSoftSkills(user?.id ?? "");
  const jobPreferences = await getJobPreferences(user?.id ?? "");
  const workTandemPreferences = await getWorkTandem(user?.id ?? "");

  return (
    <Profile
      user={user}
      workExperiences={workExperiences}
      education={education}
      techSkills={techSkills}
      softSkills={softSkills}
      jobPreferences={jobPreferences}
      workTandemPreferences={workTandemPreferences}
    />
  );
}
