/*
  Warnings:

  - The values [OneMonth,ThreeMonths,SixMonths] on the enum `Availability` will be removed. If these variants are still used in the database, this will fail.
  - The values [FullTime,PartTime,OpenToOpportunities] on the enum `EmploymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [SoftwareDevelopment,SalesMarketing,ProductManagment,ScrumMaster] on the enum `JobRoleFamily` will be removed. If these variants are still used in the database, this will fail.
  - The values [FrontendDeveloper,BackendDeveloper,FullstackDeveloper,MobileDeveloper,ProductManager,DataScientist,DevOpsEngineer,QAEngineer,SoftwareEngineer] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - The values [Onsite] on the enum `WorkMode` will be removed. If these variants are still used in the database, this will fail.
  - The values [FullTime,PartTime,JobSharing] on the enum `WorkPreference` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Availability_new" AS ENUM ('One_Month', 'Three_Months', 'Six_Months');
ALTER TYPE "Availability" RENAME TO "Availability_old";
ALTER TYPE "Availability_new" RENAME TO "Availability";
DROP TYPE "Availability_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EmploymentStatus_new" AS ENUM ('Freelance', 'Full_Time', 'Part_Time', 'Open_to_opportunities');
ALTER TABLE "User" ALTER COLUMN "employmentStatus" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "employmentStatus" TYPE "EmploymentStatus_new" USING ("employmentStatus"::text::"EmploymentStatus_new");
ALTER TYPE "EmploymentStatus" RENAME TO "EmploymentStatus_old";
ALTER TYPE "EmploymentStatus_new" RENAME TO "EmploymentStatus";
DROP TYPE "EmploymentStatus_old";
ALTER TABLE "User" ALTER COLUMN "employmentStatus" SET DEFAULT 'Freelance';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "JobRoleFamily_new" AS ENUM ('Software_Development', 'Data', 'Fintech', 'Design', 'Sales_Marketing', 'Product_Managment', 'Scrum_Master', 'Other');
ALTER TABLE "User" ALTER COLUMN "jobRoleFamily" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "jobRoleFamily" TYPE "JobRoleFamily_new" USING ("jobRoleFamily"::text::"JobRoleFamily_new");
ALTER TYPE "JobRoleFamily" RENAME TO "JobRoleFamily_old";
ALTER TYPE "JobRoleFamily_new" RENAME TO "JobRoleFamily";
DROP TYPE "JobRoleFamily_old";
ALTER TABLE "User" ALTER COLUMN "jobRoleFamily" SET DEFAULT 'Other';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('Frontend_Developer', 'Backend_Developer', 'Fullstack_Developer', 'Mobile_Developer', 'Designer', 'Product_Manager', 'Data_Scientist', 'DevOps_Engineer', 'QA_Engineer', 'Software_Engineer', 'Other');
ALTER TABLE "JobPreference" ALTER COLUMN "role" TYPE "Roles_new"[] USING ("role"::text::"Roles_new"[]);
ALTER TABLE "TandemPreference" ALTER COLUMN "idealPartnerRole" TYPE "Roles_new"[] USING ("idealPartnerRole"::text::"Roles_new"[]);
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkMode_new" AS ENUM ('Hybrid', 'Remote', 'On_site');
ALTER TABLE "User" ALTER COLUMN "workMode" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "workMode" TYPE "WorkMode_new" USING ("workMode"::text::"WorkMode_new");
ALTER TYPE "WorkMode" RENAME TO "WorkMode_old";
ALTER TYPE "WorkMode_new" RENAME TO "WorkMode";
DROP TYPE "WorkMode_old";
ALTER TABLE "User" ALTER COLUMN "workMode" SET DEFAULT 'Hybrid';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkPreference_new" AS ENUM ('Full_Time', 'Part_Time', 'Job_Sharing', 'Hybrid', 'Remote');
ALTER TABLE "JobPreference" ALTER COLUMN "workPreference" TYPE "WorkPreference_new"[] USING ("workPreference"::text::"WorkPreference_new"[]);
ALTER TYPE "WorkPreference" RENAME TO "WorkPreference_old";
ALTER TYPE "WorkPreference_new" RENAME TO "WorkPreference";
DROP TYPE "WorkPreference_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AdditionalInfo" DROP CONSTRAINT "AdditionalInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_userId_fkey";

-- DropForeignKey
ALTER TABLE "JobPreference" DROP CONSTRAINT "JobPreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reference" DROP CONSTRAINT "Reference_userId_fkey";

-- DropForeignKey
ALTER TABLE "SoftSkills" DROP CONSTRAINT "SoftSkills_userId_fkey";

-- DropForeignKey
ALTER TABLE "TandemPreference" DROP CONSTRAINT "TandemPreference_userId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalSkills" DROP CONSTRAINT "TechnicalSkills_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkExperience" DROP CONSTRAINT "WorkExperience_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "marketingEmails" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profileVisibility" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "receiveMarketingEmails" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "TechnicalSkills" ADD CONSTRAINT "TechnicalSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftSkills" ADD CONSTRAINT "SoftSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPreference" ADD CONSTRAINT "JobPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TandemPreference" ADD CONSTRAINT "TandemPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalInfo" ADD CONSTRAINT "AdditionalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
