import { type Education } from "@prisma/client";
import { CardContent, CardHeader } from "~/components/ui/card";

export default function CandidateEducation({
  educatio,
}: {
  educatio: Education[];
}) {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Education & Certifications</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          {educatio.map((education: Education, index: number) => (
            <ul key={index} className="space-y-3">
              <li className="flex justify-between">
                <span className="w-full">Degree</span>
                <span className="w-full">{education.degree}</span>
              </li>
              <li className="flex justify-between">
                <span className="w-full">Field Of Study</span>
                <span className="w-full">
                  {education.fieldOfStudy ?? "N/A"}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="w-full">Institution</span>
                <span className="w-full">{education.institution ?? "N/A"}</span>
              </li>
              <li className="flex justify-between">
                <span className="w-full">Graduation Year</span>
                <span className="w-full">
                  {education.graduationYear ?? "N/A"}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </CardContent>
    </>
  );
}
