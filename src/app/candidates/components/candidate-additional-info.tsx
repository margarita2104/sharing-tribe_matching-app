import { type AdditionalInfo } from "@prisma/client";
import { CardContent } from "~/components/ui/card";

type Language = {
  name: string;
  proficiency: "Mother Tongue" | "Fluent" | "Intermediate" | "Beginner";
};

export default function CandidateAdditionalInfo({
  additionalInfo,
}: {
  additionalInfo: AdditionalInfo;
}) {
  const parsedLanguages: Language[] = Array.isArray(additionalInfo?.languages)
    ? (additionalInfo.languages as Language[])
    : [];
  return (
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center space-x-6">
          <p className="w-64">Hobbies and Interests</p>
          <div className="flex w-full">
            {additionalInfo?.hobbiesAndInterests.length ? (
              additionalInfo.hobbiesAndInterests.map((hobby, index) => (
                <p key={index} className="mr-4">
                  {hobby}
                </p>
              ))
            ) : (
              <p>No hobbies and interests</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-10">
          <p className="">Volunteering experience</p>

          <p className="">{additionalInfo?.volunteering}</p>
        </div>

        <div className="flex items-center space-x-10">
          <p className="">Languages</p>
          <div className="flex w-full">
            {parsedLanguages.map((language, index) => (
              <span key={index}>
                {language.name} - {language.proficiency}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-10">
          <p className="">Preferred Work Schedule</p>
          <p>{additionalInfo?.preferredWorkSchedule}</p>
        </div>
      </div>
    </CardContent>
  );
}
