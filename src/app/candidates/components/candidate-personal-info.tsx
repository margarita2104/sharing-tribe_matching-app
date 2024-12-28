import { type User } from "@prisma/client";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function CandidatePersonalInfo({ user }: { user: User }) {
  return (
    <Card className="h-fit w-full" title="Personal Information">
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Personal Information</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="w-full">Full Name</p>
            <p className="w-full">{user.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Location</p>
            <p className="w-full">{user.location ? user.location : "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Email</p>
            <p className="w-full">{user.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Social Media (Linkedin)</p>
            <p className="w-full">{user.linkedinUrl ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Social Media (Other links)</p>
            <p className="w-full">{user.githubUrl ?? "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
