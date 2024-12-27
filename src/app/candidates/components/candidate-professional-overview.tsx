import { User } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { type ExtendedUser } from "~/next-auth";

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
        <div>
          <p className="w-full">{user.jobTitle ?? "N/A"}</p>

          <p className="w-full">{user.jobRoleFamily ?? "N/A"}</p>
          <p className="w-full">{user.employmentStatus ?? "N/A"}</p>

          <p className="w-full">{user.workMode ?? "N/A"}</p>

          <p className="w-full">{user.availability ?? "N/A"}</p>
          <p className="w-full">{user.currentCompany ?? "N/A"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
