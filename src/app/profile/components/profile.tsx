"use client";

import Image from "next/image";
import { useState } from "react";
import { type User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  bio?: string;
  linkedinUrl?: string;
}
import { Button } from "~/components/ui/button";
import { RxAvatar } from "react-icons/rx";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useCurrentUser } from "~/hooks/use-current-user";
import { Bio } from "./short-bio-form";

export default function Profile() {
  const user = useCurrentUser();
  console.log(user);

  if (!user) return null;

  return (
    <>
      <ProfileHeader user={user} />
      <div className="flex flex-wrap gap-x-4">
        <PersonalInformation user={user} />
        <PersonalInformation user={user} />
      </div>
      <AddNewSection />
    </>
  );
}

function ProfileHeader({ user }: { user: User }) {
  return (
    <>
      <div className="mt-12 flex gap-x-8">
        <div>
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full"
            />
          ) : (
            <RxAvatar className="h-24 w-24" />
          )}
        </div>
        <div className="flex-col items-center justify-center space-y-4">
          <div className="space-y-1">
            <p className="text-2xl text-violet">{user.name}</p>
            <p>{user.email}</p>
          </div>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Edit Profile
          </Button>
        </div>
        <p>C</p>
      </div>
      <p>{user.bio}</p>
    </>
  );
}

function PersonalInformation({ user }: { user: User }) {
  return (
    <Card className="mt-14 w-[400px]" title="Personal Information">
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Personal Information</h2>
          <div className="cursor-pointer">
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
        <div className="flex justify-between">
          <p className="text-violet">Full Name</p>
          <p className="text-slate-500">{user.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-violet">Email</p>
          <p className="text-slate-500">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AddNewSection() {
  const [bioClicked, setBioClicked] = useState(false);
  return (
    <div className="mb-14 mt-14">
      <h2 className="text-center text-xl">Add new section</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Professional Overview
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Work Experience
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Education & Certifications
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Skills
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Job Preferences
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
            onClick={() => setBioClicked(!bioClicked)}
          >
            Short Bio
          </Button>
          {bioClicked && <Bio />}
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Work Tandem Preference
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Projects & Portfolio
          </Button>
          <Button
            variant="secondary"
            className="border-[1px] border-tree-poppy bg-white"
          >
            References
          </Button>
          <Button
            className="border-[1px] border-tree-poppy bg-white"
            variant="secondary"
          >
            Additional Information
          </Button>
        </div>
      </div>
    </div>
  );
}
