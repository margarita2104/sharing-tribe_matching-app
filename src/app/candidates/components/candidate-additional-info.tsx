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
        <div className="flex flex-wrap place-items-center items-center space-x-4 space-y-2">
          <p className="">Hobbies and Interests</p>
          {additionalInfo?.hobbiesAndInterests.length ? (
            additionalInfo.hobbiesAndInterests.map((hobby, index) => (
              <div key={index} className="flex items-center space-x-2">
                <p className="flex w-full items-center justify-center place-self-center">
                  {hobby}
                </p>
              </div>
            ))
          ) : (
            <p>No hobbies and interests</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <p className="">Volunteering experience</p>

          <p className="">{additionalInfo?.volunteering}</p>
        </div>

        <div className="flex items-center space-x-4 space-y-2">
          <p className="">Languages</p>
          {parsedLanguages.map((language, index) => (
            <div key={index} className="flex items-center justify-between">
              <p>
                {language.name} - {language.proficiency}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <p className="">Preferred Work Schedule</p>
          <p>{additionalInfo?.preferredWorkSchedule}</p>
        </div>
      </div>
    </CardContent>
  );
}
