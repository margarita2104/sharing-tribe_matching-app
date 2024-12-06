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
import { Card, CardFooter } from "~/components/ui/card";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ModalWorkExpButton } from "./(workExperience)/modal-work-exp";
import { ModalEducation } from "./(educationCertidication)/modal-education";
import { EducationCertification } from "./(educationCertidication)/education-certification";
import { TechnicalSkills } from "./(techSkills)/tech-skils";
import Image from "next/image";
import { SoftSkillsMain } from "./(softSkills)/soft-skill";
import {
  type TandemPreference,
  type JobPreference,
  type Reference,
  type Project,
  type AdditionalInfo,
} from "@prisma/client";
import { JobPreferences } from "./(jobPreferences)/job-preferences";
import { JobPreferencesSave } from "./(jobPreferences)/job-preference-save";
import { WorkTandemSave } from "./(work-tandem)/work-tandem-save";
import { WorkTandem } from "./(work-tandem)/work-tandem";
import { ReferenceComponent } from "./(references)/references";
import { ModalReferences } from "./(references)/modal-references";
import Bio from "./(short-bio)/bio";
import { ProjectComponent } from "./(projects)/project";
import { ModalProject } from "./(projects)/modal-project";
import { AdditionalInfoSave } from "./(additionalInfo)/additional-info-save";
import { AdditionalInfoComponent } from "./(additionalInfo)/additional-info";
import Link from "next/link";

type ProfileProps = {
  user: ExtendedUser;
  workExperiences: WorkExperience[];
  education: Education[];
  techSkills: TechSkills[];
  softSkills: SoftSkills[];
  jobPreferences: JobPreference | null;
  workTandemPreferences: TandemPreference | null;
  references: Reference[];
  projects: Project[];
  infos: AdditionalInfo | null;
};

export default function Profile({
  user,
  workExperiences,
  education,
  techSkills,
  softSkills,
  jobPreferences,
  workTandemPreferences,
  references,
  projects,
  infos,
}: ProfileProps) {
  const [showAll, setShowAll] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllReference, setShowAllReferences] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editJobPreferences, setEditJobPreferences] = useState(false);
  const [showTechSkills, setShowTechSkills] = useState(
    Boolean(techSkills.length),
  );
  const [ShowJobPreferences, setJobPreferences] = useState(
    Boolean(jobPreferences),
  );
  const [ShowWorkTandemPreferences, setShowWorkTandemPreferences] = useState(
    Boolean(
      workTandemPreferences?.complementarySkills.length ??
        workTandemPreferences?.idealPartnerRole.length,
    ),
  );
  const [ShowAdditionalInfo, setShowAdditionalInfo] = useState(
    Boolean(
      infos?.languages ??
        infos?.hobbiesAndInterests ??
        infos?.volunteering ??
        infos?.preferredWorkSchedule,
    ),
  );
  const [editAdditionalInfo, setEditAdditionalInfo] = useState(false);
  const [editWorkTandem, setEditWorkTandem] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  if (!user) return null;

  return (
    <>
      <ProfileHeader
        user={user}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
      />

      <div className="mt-8 flex w-9/12 items-center justify-center space-x-8">
        <Bio
          user={user}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
        />
      </div>
      {user.discTestResult ? null : (
        <Button
          asChild
          className="bg-tree-poppy text-white hover:bg-tree-poppy/90"
        >
          <Link href="/disc/about/job-roles">Take DISC Test</Link>
        </Button>
      )}
      {user.workExperiences.length &&
      user.education.length &&
      (user.technicalSkills.length || user.softSkills.length) &&
      user.jobPreferences &&
      user.tandemPreferences &&
      user.references.length &&
      user.projects.length &&
      user.additionalInfo &&
      user.jobTitle &&
      user.jobRoleFamily &&
      user.employmentStatus &&
      user.workMode &&
      user.availability &&
      user.currentCompany ? null : (
        <AddNewSection
          userId={user.id ?? ""}
          bio={user.bio}
          workExperienceLenght={workExperiences.length}
          educationLength={education.length}
          referencesLength={references.length}
          projectsLength={projects.length}
          jobTitle={user.jobTitle}
          setShowTechSkills={setShowTechSkills}
          showTechSkills={showTechSkills}
          techSkills={techSkills.length}
          jobPreferences={Boolean(jobPreferences)}
          setShowJobPreferences={setJobPreferences}
          workTandemPreferences={Boolean(
            workTandemPreferences?.complementarySkills.length ??
              workTandemPreferences?.idealPartnerRole.length,
          )}
          setShowWorkTandemPreferences={setShowWorkTandemPreferences}
          setShowAdditionalInfo={setShowAdditionalInfo}
          infos={Boolean(infos)}
        />
      )}

      <div className="mt-8 grid w-11/12 grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <PersonalInfo user={user} />

        {!user.jobTitle ? null : <ProfessionalOverview user={user} />}

        {workExperiences.length ? (
          <Card className="h-fit w-full">
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
          <Card className="h-fit w-full">
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
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
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
            <TechnicalSkills
              userId={user.id}
              techSkills={techSkills}
              setEdit={setEdit}
              edit={edit}
            />
          </div>
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Soft Skills</h2>
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

            <SoftSkillsMain
              userId={user.id}
              softSkills={softSkills}
              setEdit={setEdit}
              edit={edit}
            />
          </div>
        </Card>
      ) : null}

      {ShowJobPreferences ? (
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Job Preferences</h2>
              {editJobPreferences ? null : (
                <div
                  className="cursor-pointer"
                  onClick={() => setEditJobPreferences(true)}
                >
                  <Image
                    src="/icons/profile-edit.png"
                    alt="Profile edit icon"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
            {!jobPreferences ? (
              <JobPreferences userId={user.id} />
            ) : (
              <JobPreferencesSave
                userId={user.id}
                jobPreferences={jobPreferences}
                editJobPreferences={editJobPreferences}
                setEditJobPreferences={setEditJobPreferences}
              />
            )}
          </div>
        </Card>
      ) : null}

      {ShowWorkTandemPreferences ? (
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Work Tandem Preferences</h2>
              {editWorkTandem ? null : (
                <div
                  className="cursor-pointer"
                  onClick={() => setEditWorkTandem(true)}
                >
                  <Image
                    src="/icons/profile-edit.png"
                    alt="Profile edit icon"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
            {!workTandemPreferences ? (
              <WorkTandem userId={user.id} />
            ) : (
              <WorkTandemSave
                userId={user.id}
                workTandemPreferences={workTandemPreferences}
                editWorkTandem={editWorkTandem}
                setEditWorkTandem={setEditWorkTandem}
              />
            )}
          </div>
        </Card>
      ) : null}

      {references.length ? (
        <Card className="mt-6 h-fit w-11/12">
          {references
            .slice(0, showAllReference ? references.length : 1)
            .map((reference, index) => (
              <ReferenceComponent key={index} reference={reference} />
            ))}
          <CardFooter className="flex w-full justify-between">
            {!showAllReference && references.length > 1 && (
              <>
                <Button onClick={() => setShowAllReferences(true)}>
                  Show More
                </Button>
                <ModalReferences userId={user.id} title="Add more" />
              </>
            )}
            {references.length === 1 ? (
              <ModalReferences userId={user.id} title="Add more" />
            ) : null}
            {showAllReference && references.length > 1 ? (
              <>
                <Button onClick={() => setShowAllReferences(false)}>
                  Show Less
                </Button>
                <ModalReferences userId={user.id} title="Add more" />
              </>
            ) : null}
          </CardFooter>
        </Card>
      ) : null}

      {projects.length ? (
        <Card className="mt-6 h-fit w-11/12">
          {projects
            .slice(0, showAllProjects ? projects.length : 1)
            .map((project, index) => (
              <ProjectComponent key={index} project={project} />
            ))}
          <CardFooter className="flex w-full justify-between">
            {!showAllProjects && projects.length > 1 && (
              <>
                <Button onClick={() => setShowAllProjects(true)}>
                  Show More
                </Button>
                <ModalProject userId={user.id} title="Add more" />
              </>
            )}
            {projects.length === 1 ? (
              <ModalProject userId={user.id} title="Add more" />
            ) : null}
            {showAllProjects && projects.length > 1 ? (
              <>
                <Button onClick={() => setShowAllProjects(false)}>
                  Show Less
                </Button>
                <ModalProject userId={user.id} title="Add more" />
              </>
            ) : null}
          </CardFooter>
        </Card>
      ) : null}

      {ShowAdditionalInfo ? (
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Additional Information</h2>
              {editAdditionalInfo ? null : (
                <div
                  className="cursor-pointer"
                  onClick={() => setEditAdditionalInfo(true)}
                >
                  <Image
                    src="/icons/profile-edit.png"
                    alt="Profile edit icon"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
            {!infos ? (
              <AdditionalInfoComponent userId={user.id} />
            ) : (
              <AdditionalInfoSave
                userId={user.id}
                infos={infos}
                editAdditionalInfo={editAdditionalInfo}
                setEditAdditionalInfo={setEditAdditionalInfo}
              />
            )}
          </div>
        </Card>
      ) : null}
    </>
  );
}
