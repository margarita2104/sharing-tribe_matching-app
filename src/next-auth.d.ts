import {
  type TandemPreference,
  type JobPreference,
  type Reference,
  type Project,
  type AdditionalInfo,
} from "@prisma/client";
import { type DefaultSession } from "next-auth";

type WorkExperience = {
  id: number;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string | null;
  userId: string;
};

type TechSkills = {
  id: number;
  name: string;
  userId: string;
};
type SoftSkills = {
  id: number;
  name: string;
  userId: string;
};
type Education = {
  id: number;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationYear: string | null;
  userId: string;
};

type jobRoleFamily =
  | "SoftwareDevelopment"
  | "Data"
  | "Fintech"
  | "Design"
  | "SalesMarketing"
  | "ProductManagment"
  | "ScrumMaster"
  | "Other";
type employmentStatus =
  | "Freelance"
  | "FullTime"
  | "PartTime"
  | "OpenToOpportunities";
type workMode = "Hybrid" | "Remote" | "Onsite";
type availability = "OneMonth" | "ThreeMonths" | "SixMonths";
export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  image: string;
  isOAuth: boolean;
  linkedinUrl: string;
  bio: string;
  githubUrl: string;
  location: string;
  jobTitle: string;
  jobRoleFamily: jobRoleFamily;
  employmentStatus: employmentStatus;
  workMode: workMode;
  availability: availability;
  currentCompany: string;
  workExperiences: WorkExperience[];
  education: Education[];
  technicalSkills: TechSkills[];
  softSkills: SoftSkills[];
  jobPreferences: JobPreference | null;
  tandemPreferences: TandemPreference | null;
  references: Reference[];
  projects: Project[];
  additionalInfo: AdditionalInfo | null;
  discTestResult: string | null;
  marketingEmails: boolean;
  profileVisibility: boolean;
  receiveMarketingEmails: boolean;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}
