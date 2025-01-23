import { type User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function CandidateProfileHeader({ user }: { user: User }) {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2">
      <Image
        src={user.image ?? "/icons/default-avatar.png"}
        alt="Profile picture"
        width={100}
        height={100}
        quality={100}
        className="h-24 w-24 justify-self-center rounded-full object-cover"
      />

      <div className="relative mt-6 space-y-1">
        <p className="w-full text-2xl text-violet">{user.name}</p>

        <div className="absolute -right-3 -top-3 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-tree-poppy text-center text-purple-800">
          <span className="text-center">{user?.discTestResult}</span>
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
  );
}
