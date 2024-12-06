"use client";
import { Button } from "~/components/ui/button";
import { ModalWorkExpButton } from "./(workExperience)/modal-work-exp";
import { ModalEducation } from "./(educationCertidication)/modal-education";
import { ModalProfessionalOverview } from "./(professionalOverview)/modal-professional-overview";
import { ModalReferences } from "./(references)/modal-references";
import { ModalBio } from "./(short-bio)/modal-short-bio";
import { ModalProject } from "./(projects)/modal-project";

export function AddNewSection({
  jobPreferences,
  userId,
  workExperienceLenght,
  educationLength,
  jobTitle,
  setShowTechSkills,
  showTechSkills,
  techSkills,
  bio,
  setShowJobPreferences,
  setShowWorkTandemPreferences,
  workTandemPreferences,
  referencesLength,
  projectsLength,
  setShowAdditionalInfo,
  infos,
}: {
  userId: string;
  workExperienceLenght: number;
  educationLength: number;
  jobTitle: string;
  bio: string;
  showTechSkills: boolean;
  techSkills: number;
  jobPreferences: boolean;
  setShowJobPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWorkTandemPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  workTandemPreferences: boolean;
  referencesLength: number;
  projectsLength: number;
  setShowTechSkills: React.Dispatch<React.SetStateAction<boolean>>;
  infos: boolean;
  setShowAdditionalInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="mt-8">
      <h2 className="text-center text-xl">Add new section</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {jobTitle ? null : (
            <ModalProfessionalOverview title="Professional Overview" />
          )}

          {workExperienceLenght ? null : (
            <ModalWorkExpButton userId={userId} title="Work Experience" />
          )}
          {educationLength ? null : (
            <ModalEducation
              userId={userId}
              title="Education & Certifications"
            />
          )}
          {techSkills ? null : (
            <Button
              onClick={() => setShowTechSkills(!showTechSkills)}
              className="border-[1px] border-tree-poppy bg-white"
              variant="secondary"
            >
              Tech Skills
            </Button>
          )}
          {jobPreferences ? null : (
            <Button
              className="border-[1px] border-tree-poppy bg-white"
              variant="secondary"
              onClick={() => setShowJobPreferences(true)}
            >
              Job Preferences
            </Button>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {bio ? null : <ModalBio title="Bio" />}
          {workTandemPreferences ? null : (
            <Button
              className="border-[1px] border-tree-poppy bg-white"
              variant="secondary"
              onClick={() => setShowWorkTandemPreferences(true)}
            >
              Work Tandem Preference
            </Button>
          )}

          {projectsLength ? null : (
            <ModalProject userId={userId} title="Projects" />
          )}
          {referencesLength ? null : (
            <ModalReferences userId={userId} title="References" />
          )}
          {infos ? null : (
            <Button
              className="border-[1px] border-tree-poppy bg-white"
              variant="secondary"
              onClick={() => setShowAdditionalInfo(true)}
            >
              Additional info
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
