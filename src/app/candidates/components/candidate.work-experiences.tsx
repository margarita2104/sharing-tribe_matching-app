import type { WorkExperience } from "@prisma/client";
import { CardContent, CardHeader } from "~/components/ui/card";

export default function CandidateWorkExperiences({
  workExperience,
}: {
  workExperience: WorkExperience;
}) {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Work Experience</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <div className="w-full">Job Title</div>
              <div className="w-full">{workExperience.jobTitle}</div>
            </li>
            <li className="flex justify-between">
              <div className="w-full">Company Name</div>
              <div className="w-full">
                {workExperience.companyName ?? "N/A"}
              </div>
            </li>
            <li className="flex justify-between">
              <div className="w-full">Start Date</div>
              <div className="w-full">{workExperience.startDate}</div>
            </li>
            <li className="flex justify-between">
              <div className="w-full">End Date</div>
              <div className="w-full">{workExperience.endDate}</div>
            </li>
          </ul>
        </div>
      </CardContent>
    </>
  );
}
