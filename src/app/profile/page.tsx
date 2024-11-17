import Profile from "./components/profile";
import { getEducation, getWorkExperience } from "~/actions/profile";
import { currentUser } from "~/lib/auth";

export default async function ProfileMain() {
  const user = await currentUser();
  if (!user) return null;
  const workExperiences = await getWorkExperience(user?.id ?? "");
  const education = await getEducation(user?.id ?? "");

  return (
    <Profile
      user={user}
      workExperiences={workExperiences}
      education={education}
    />
  );
}
