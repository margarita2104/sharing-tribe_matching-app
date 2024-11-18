"use client";
import { PersonalInfo } from "./personal-info";

import { ProfessionalOverview } from "./professional-overview";
import { WorkExperiences } from "./(workExperience)/work-experience";
import { ProfileHeader } from "./profile-header";
import { AddNewSection } from "./add-new-section";

import {
  type SoftSkills,
  type TechSkills,
  type Education,
  type ExtendedUser,
  type WorkExperience,
} from "~/next-auth";
import { Card, CardFooter, CardHeader } from "~/components/ui/card";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ModalWorkExpButton } from "./(workExperience)/modal-work-exp";
import { ModalEducation } from "./(educationCertidication)/modal-education";
import { EducationCertification } from "./(educationCertidication)/education-certification";
import { TechnicalSkills } from "./(techSkills)/tech-skils";
import Image from "next/image";

type ProfileProps = {
  user: ExtendedUser;
  workExperiences: WorkExperience[];
  education: Education[];
  techSkills: TechSkills[];
  softSkills: SoftSkills[];
};

export default function Profile({
  user,
  workExperiences,
  education,
  techSkills,
  softSkills,
}: ProfileProps) {
  const [showAll, setShowAll] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showTechSkills, setShowTechSkills] = useState(false);

  if (!user) return null;
  if (!workExperiences) return null;
  if (!education) return null;
  if (!techSkills) return null;
  if (!softSkills) return null;

  return (
    <>
      <ProfileHeader user={user} />
      <div className="mt-8 grid grid-cols-1 gap-2 md:grid-cols-2">
        <PersonalInfo user={user} />
        {!user.jobTitle ? null : <ProfessionalOverview user={user} />}

        {workExperiences.length ? (
          <Card className="h-fit w-[250px] sm:min-w-[350px]">
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
              {workExperiences.length === 1 ? (
                <ModalWorkExpButton userId={user.id} title="Add more" />
              ) : null}
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
          <Card className="h-fit w-[250px] sm:min-w-[350px]">
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
              {education.length === 1 ? (
                <ModalEducation userId={user.id} title="Add more" />
              ) : null}
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
      {showTechSkills ? (
        <Card className="m-14 h-fit w-10/12">
          <CardHeader>
            <div className="flex justify-between">
              <h2 className="text-lg text-violet">Technical Skills</h2>
              {edit ? null : (
                <div className="cursor-pointer" onClick={() => setEdit(true)}>
                  <Image
                    src="/icons/profile-edit.png"
                    alt="Profile edit icon"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
          </CardHeader>

          <TechnicalSkills
            userId={user.id}
            techSkills={techSkills}
            setEdit={setEdit}
            edit={edit}
          />
        </Card>
      ) : null}

      <AddNewSection
        userId={user.id ?? ""}
        workExperienceLenght={workExperiences.length}
        educationLength={education.length}
        jobTitle={user.jobTitle}
        setShowTechSkills={setShowTechSkills}
        showTechSkills={showTechSkills}
        techSkills={techSkills.length}
      />
    </>
  );
}
