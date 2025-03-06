import type { TandemPreference } from "@prisma/client";
import { CardContent } from "~/components/ui/card";

export default function CandidateWorkTandemPreferences({
  tandemPreferences,
}: {
  tandemPreferences: TandemPreference;
}) {
  return (
    <CardContent>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center space-x-4 space-y-2">
          {tandemPreferences?.idealPartnerRole.map((role, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <p>Ideal Tandem Partner</p>
              <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                {role}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center space-x-4 space-y-2">
          <div className="flex items-center space-x-2">
            <p>Complementary Skills</p>
            {tandemPreferences?.complementarySkills.map((role, index) => (
              <span
                key={index}
                className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  );
}
