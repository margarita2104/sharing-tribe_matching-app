import type { User } from "@prisma/client";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function CandidateProfessionalOverview({
  user,
}: {
  user: User;
}) {
  return (
    <Card className="h-fit w-full" title="Personal Information">
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Professional Overview</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="w-full">Job Title</p>
            <p className="w-full">{user.jobTitle ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Job role family</p>
            <p className="w-full">{user.jobRoleFamily ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Employment Status</p>
            <p className="w-full">{user.employmentStatus ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Work Mode</p>
            <p className="w-full">{user.workMode ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Availability</p>
            <p className="w-full">{user.availability ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Current Company</p>
            <p className="w-full">{user.currentCompany ?? "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
