"use client";

import Image from "next/image";
import { useState } from "react";
import { type User as NextAuthUser } from "next-auth";

export interface User extends NextAuthUser {
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}
import { Button } from "~/components/ui/button";
import { RxAvatar } from "react-icons/rx";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useCurrentUser } from "~/hooks/use-current-user";
import { Bio } from "./short-bio-form";
import { PersonalInfo } from "./personal-info";
import { ProfessionalOverview } from "./professional-overview";

export const sectionFields = {
  personalInfo: [
    { label: "Full Name", name: "name" },
    { label: "Location", name: "location" },
    { label: "Email", name: "email" },
    { label: "LinkedIn URL", name: "linkedinUrl" },
    { label: "Github URL", name: "githubUrl" },
  ],
  professionalOverview: [
    { label: "Job Title", name: "jobTitle", type: "select" },
    { label: "Job Role Family", name: "jobRoleFamily", type: "select" },
    {
      label: "Current Employment Status",
      name: "employmentStatus",
      type: "select",
    },
    { label: "Desired Work Mode", name: "workMode", type: "select" },
    { label: "Availability", name: "availability", type: "select" },
    { label: "Current Company", name: "currentCompany" },
  ],
  workExperience: [
    { label: "Job Title", name: "jobTitle" },
    { label: "Company Name", name: "companyName" },
    { label: "Start Date", name: "startDate", type: "date" },
    { label: "End Date", name: "endDate", type: "date" },
  ],
  educationCertification: [
    { label: "Highest Degree/Qualification", name: "degree" },
    { label: "Field of Study", name: "fieldOfStudy" },
    { label: "Institution", name: "institution", type: "date" },
    { label: "Graduation Year", name: "graduationYear" },
  ],
  technicalSkills: [{ label: "Tech Skills", name: "name" }],
  softSkills: [{ label: "Soft Skills", name: "name" }],
  jobPreference: [
    { label: "Desired Roles", name: "role" },
    { label: "Work Preference", name: "workPreference" },
    { label: "Desired Industry", name: "industry", type: "date" },
  ],
  workTandem: [
    { label: "Ideal Tandem Partner", name: "idealPartnerRole" },
    { label: "Complementary Skills", name: "complementarySkills" },
  ],
  projectPortfolio: [
    { label: "Project Title", name: "title" },
    { label: "Role in the Project", name: "role" },
    { label: "Description", name: "description" },
    { label: "Link to the Project", name: "link" },
    { label: "Project Files", name: "projectFiles", type: "file" },
  ],
  references: [
    { label: "Reference Name", name: "name" },
    { label: "Relationship to Candidate", name: "relationship" },
    { label: "Company/Organization", name: "company" },
    { label: "Contact Information", name: "contactInfo" },
  ],
  additionalInfo: [
    { label: "Hobbies and Interests", name: "hobbiesAndInterests" },
    { label: "Volunteering Experience", name: "volunteering" },
    { label: "Languages", name: "languages" },
    { label: "Preferred Work Schedule", name: "preferredWorkSchedule" },
  ],
};

export default function Profile() {
  const user = useCurrentUser();
  console.log(user);

  if (!user) return null;

  return (
    <>
      <ProfileHeader user={user} />
      <div className="flex flex-wrap gap-x-4">
        <PersonalInfo user={user} />
        <ProfessionalOverview user={user} />
      </div>
      <AddNewSection />
    </>
  );
}

function ProfileHeader({ user }: { user: User }) {
  return (
    <>
      <div className="mt-12 flex gap-x-8">
        <div>
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full"
            />
          ) : (
            <RxAvatar className="h-24 w-24" />
          )}
        </div>
        <div className="flex-col items-center justify-center space-y-4">
          <div className="space-y-1">
            <p className="text-2xl text-violet">{user.name}</p>
            <p>{user.email}</p>
          </div>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Edit Profile
          </Button>
        </div>
        <p>C</p>
      </div>
      <p>{user.bio}</p>
    </>
  );
}

function AddNewSection() {
  const [bioClicked, setBioClicked] = useState(false);
  return (
    <div className="mb-14 mt-14">
      <h2 className="text-center text-xl">Add new section</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Professional Overview
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Work Experience
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Education & Certifications
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Skills
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Job Preferences
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
            onClick={() => setBioClicked(!bioClicked)}
          >
            Short Bio
          </Button>
          {bioClicked && <Bio />}
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
