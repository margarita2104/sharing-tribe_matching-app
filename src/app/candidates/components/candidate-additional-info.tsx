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
        <div className="w-full space-y-2">
          <div className="flex w-full items-center justify-between">
            <p className="w-full">Hobbies and Interests</p>
            <div className="w-full">
              {additionalInfo?.hobbiesAndInterests.length ? (
                <div className="flex flex-wrap">
                  {additionalInfo.hobbiesAndInterests.map((hobby, index) => (
                    <p key={index} className="mr-4">
                      {hobby}
                    </p>
                  ))}
                </div>
              ) : (
                <p>No hobbies and interests</p>
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full">Volunteering experience</p>
            <p className="w-full">{additionalInfo?.volunteering || "N/A"}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full">Languages</p>
            <div className="w-full">
              {parsedLanguages.length ? (
                <div className="flex flex-wrap">
                  {parsedLanguages.map((language, index) => (
                    <span key={index} className="mr-4">
                      {language.name} - {language.proficiency}
                    </span>
                  ))}
                </div>
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full">Preferred Work Schedule</p>
            <p className="w-full">{additionalInfo?.preferredWorkSchedule || "N/A"}</p>
          </div>
        </div>
      </CardContent>
    );
  
}
