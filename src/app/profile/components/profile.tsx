"use client";
import { PersonalInfo } from "./personal-info";

import { ProfessionalOverview } from "./professional-overview";
import { WorkExperiences } from "./(workExperience)/work-experience";
import { ProfileHeader } from "./profile-header";
import { AddNewSection } from "./add-new-section";

import {
  type Education,
  type ExtendedUser,
  type WorkExperience,
} from "~/next-auth";
import { Card, CardFooter } from "~/components/ui/card";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ModalWorkExpButton } from "./(workExperience)/modal-work-exp";
import { ModalEducation } from "./(educationCertidication)/modal-education";
import { EducationCertification } from "./(educationCertidication)/education-certification";

type ProfileProps = {
  user: ExtendedUser;
  workExperiences: WorkExperience[];
  education: Education[];
};

export default function Profile({
  user,
  workExperiences,
  education,
}: ProfileProps) {
  const [showAll, setShowAll] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);

  if (!user) return null;
  if (!workExperiences) return null;
  if (!education) return null;

  return (
    <>
      <ProfileHeader user={user} />
      <div className="flex h-fit flex-wrap justify-center gap-x-4">
        <PersonalInfo user={user} />
        <ProfessionalOverview user={user} />
        {workExperiences.length ? (
          <Card className="mt-14 h-fit w-[450px]">
            {workExperiences
              .slice(0, showAll ? workExperiences.length : 1)
              .map((workExperience, index) => (
                <WorkExperiences key={index} workExperience={workExperience} />
              ))}
            <CardFooter className="flex w-full justify-between">
              {!showAll && workExperiences.length > 1 && (
                <>
                  <Button onClick={() => setShowAll(true)}>Show More</Button>
                  <ModalWorkExpButton userId={user.id} title="Add more" />
                </>
              )}
              {showAll && (
                <>
                  <Button onClick={() => setShowAll(false)}>Show Less</Button>
                  <ModalWorkExpButton userId={user.id} title="Add more" />
                </>
              )}
            </CardFooter>
          </Card>
        ) : null}
        {education.length ? (
          <Card className="mt-14 h-fit w-[450px]">
            {education
              .slice(0, showAllEducation ? education.length : 1)
              .map((educatio, index) => (
                <EducationCertification key={index} educatio={educatio} />
              ))}
            <CardFooter className="flex w-full justify-between">
              {!showAllEducation && education.length > 1 && (
                <>
                  <Button onClick={() => setShowAllEducation(true)}>
                    Show More
                  </Button>
                  <ModalEducation userId={user.id} title="Add more" />
                </>
              )}
              {showAllEducation && (
                <>
                  <Button onClick={() => setShowAllEducation(false)}>
                    Show Less
                  </Button>
                  <ModalEducation userId={user.id} title="Add more" />
                </>
              )}
            </CardFooter>
          </Card>
        ) : null}
      </div>
      <AddNewSection
        userId={user.id ?? ""}
        workExperienceLenght={workExperiences.length}
        educationLength={education.length}
      />
    </>
  );
}
