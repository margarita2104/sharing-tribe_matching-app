import { User } from "@prisma/client";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { type ExtendedUser } from "~/next-auth";

export default function CandidateProfileHeader({ user }: { user: User }) {
  return (
    <div className="mt-14 flex flex-col items-center justify-center">
      <div className="grid w-9/12 grid-cols-1 items-center md:grid-cols-2 md:space-x-16">
        {user.image ? (
          <Image
            src={user.image}
            alt="Profile picture"
            width={100}
            height={100}
            quality={100}
            className="h-24 w-24 justify-self-center rounded-full object-cover md:justify-self-end"
          />
        ) : (
          <RxAvatar className="h-24 w-24 justify-self-center rounded-full object-cover md:justify-self-end" />
        )}

        <div className="relative mt-6 space-y-1 md:justify-self-start">
          <p className="text-2xl text-violet">{user.name}</p>

          <div className="absolute right-0 top-0 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-tree-poppy text-center text-purple-800">
            <span className="text-center">{user.discTestResult}</span>
          </div>

          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}
