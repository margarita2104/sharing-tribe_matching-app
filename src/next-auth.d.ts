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
  | "Design"
  | "ProductManagement"
  | "DataScience"
  | "DevOps"
  | "QualityAssurance"
  | "Engineering"
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
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}
