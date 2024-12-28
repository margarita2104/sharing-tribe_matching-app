import { type User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { Button } from "~/components/ui/button";

export default function CandidateProfileHeader({ user }: { user: User }) {
  return (
    <div className="relative mt-14 flex flex-col items-center justify-center">
      <div className="grid w-full grid-cols-1 items-center md:grid-cols-2 md:space-x-16">
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

        <div className="mt-6 flex flex-col items-center justify-center space-y-1 text-start">
          <p className="text-2xl text-violet">{user.name}</p>

          <div className="absolute right-0 top-0 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-tree-poppy text-center text-purple-800">
            <span className="text-center">{user.discTestResult}</span>
          </div>
          {user.marketingEmails ? <p>{user.email}</p> : null}

          {user.marketingEmails ? (
            <Button
              variant="secondary"
              asChild
              className="w-full border-[1px] border-tree-poppy bg-white"
            >
              <Link href={`mailto:${user.email}`}>Contact</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
