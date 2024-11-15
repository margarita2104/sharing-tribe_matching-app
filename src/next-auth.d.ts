import { type DefaultSession } from "next-auth";

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
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}
