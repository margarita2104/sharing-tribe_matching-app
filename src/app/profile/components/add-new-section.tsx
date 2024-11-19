"use client";
import { Button } from "~/components/ui/button";
import { ModalWorkExpButton } from "./(workExperience)/modal-work-exp";
import { Bio } from "./short-bio-form";
import { ModalEducation } from "./(educationCertidication)/modal-education";
import { ModalProfessionalOverview } from "./(professionalOverview)/modal-professional-overview";

export function AddNewSection({
  jobPreferences,
  userId,
  workExperienceLenght,
  educationLength,
  jobTitle,
  setShowTechSkills,
  showTechSkills,
  techSkills,
  setShowJobPreferences,
}: {
  userId: string;
  workExperienceLenght: number;
  educationLength: number;
  jobTitle: string;
  showTechSkills: boolean;
  techSkills: number;
  jobPreferences: boolean;
  setShowJobPreferences: React.Dispatch<React.SetStateAction<boolean>>;

  setShowTechSkills: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="mb-14 mt-14">
      <h2 className="text-center text-xl">Add new section</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-4 flex flex-wrap gap-2">
          {jobTitle ? null : (
            <ModalProfessionalOverview
              userId={userId}
              title="Professional Overview"
            />
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
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            variant="secondary"
            className="border-[1px] border-tree-poppy bg-white"
          >
            Short Bio
          </Button>

          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Work Tandem Preference
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Projects & Portfolio
          </Button>
          <Button
            variant="secondary"
            className="border-[1px] border-tree-poppy bg-white"
          >
            References
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Additional Information
          </Button>
        </div>
      </div>
    </div>
  );
}
