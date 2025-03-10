import { type JobPreference } from "@prisma/client";
import { CardContent } from "~/components/ui/card";

export default function CandidateJobPreferences({
  jobPreferences,
}: {
  jobPreferences: JobPreference;
}) {
  const replaceUnderscoreWithSpace = (value: string | null | undefined) => {
    if (!value) return value;
    return value.replace(/_/g, " ");
  };

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center space-x-4 space-y-2">
          {jobPreferences?.role.map((role, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <p>Desired Roles</p>
              <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                {replaceUnderscoreWithSpace(role)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center space-x-4 space-y-2">
          {jobPreferences?.workPreference.map((role, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <p>Work Preference</p>
              <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                {replaceUnderscoreWithSpace(role)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center space-x-4 space-y-2">
          {jobPreferences?.industry.map((role, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <p>Desired Industry</p>
              <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                {role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  );
}
