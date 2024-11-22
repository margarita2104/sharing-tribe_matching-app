import { Suspense } from "react";
import Profile from "./components/profile";
import {
  getEducation,
  getJobPreferences,
  getProjects,
  getReferences,
  getSoftSkills,
  getTechnicalSkills,
  getWorkExperience,
  getWorkTandem,
} from "~/actions/profile";
import { currentUser } from "~/lib/auth";
import Loading from "./loading";

export default async function ProfileMain() {
  const user = await currentUser();
  if (!user) return null;
  const workExperiences = await getWorkExperience(user?.id ?? "");
  const education = await getEducation(user?.id ?? "");
  const techSkills = await getTechnicalSkills(user?.id ?? "");
  const softSkills = await getSoftSkills(user?.id ?? "");
  const jobPreferences = await getJobPreferences(user?.id ?? "");
  const workTandemPreferences = await getWorkTandem(user?.id ?? "");
  const references = await getReferences(user?.id ?? "");
  const projects = await getProjects(user?.id ?? "");

  return (
    <Suspense fallback={<Loading />}>
      <Profile
        projects={projects}
        user={user}
        workExperiences={workExperiences}
        education={education}
        techSkills={techSkills}
        softSkills={softSkills}
        jobPreferences={jobPreferences}
        workTandemPreferences={workTandemPreferences}
        references={references}
      />
    </Suspense>
  );
}
