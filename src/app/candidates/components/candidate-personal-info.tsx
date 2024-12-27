import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { type ExtendedUser } from "~/next-auth";

export default function CandidatePersonalInfo({ user }: { user: User }) {
  return (
    <Card className="h-fit w-full" title="Personal Information">
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Personal Information</h2>

          <div>
            <Image
              src="/icons/profile-edit.png"
              alt="Profile edit icon"
              width={16}
              height={16}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <p className="w-full">{user.name}</p>

          <p className="w-full">{user.location ? user.location : "N/A"}</p>

          <p className="w-full">{user.email}</p>

          <p className="w-full">{user.linkedinUrl ?? "N/A"}</p>

          <p className="w-full">{user.githubUrl ?? "N/A"}</p>
        </div>
        {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
      </CardContent>
    </Card>
  );
}
