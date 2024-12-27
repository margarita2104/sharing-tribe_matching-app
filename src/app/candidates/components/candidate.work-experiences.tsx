import { type WorkExperience } from "@prisma/client";
import { CardContent, CardHeader } from "~/components/ui/card";

export default function CandidateWorkExperiences({
  workExperience,
}: {
  workExperience: WorkExperience[];
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
          {workExperience.map((experience: WorkExperience, index) => (
            <ul key={index}>
              <li className="w-full">{experience.jobTitle}</li>

              <li className="w-full">{experience.companyName ?? "N/A"}</li>

              <li className="w-full">{experience.startDate}</li>

              <li className="w-full">{experience.endDate}</li>
            </ul>
          ))}
        </div>
      </CardContent>
    </>
  );
}
