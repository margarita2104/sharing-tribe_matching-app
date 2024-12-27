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
            <ul key={index}>
              <li className="w-full">{education.degree}</li>

              <li className="w-full">{education.fieldOfStudy ?? "N/A"}</li>

              <li className="w-full">{education.institution ?? "N/A"}</li>

              <li className="w-full">{education.graduationYear ?? "N/A"}</li>
            </ul>
          ))}
        </div>
      </CardContent>
    </>
  );
}
