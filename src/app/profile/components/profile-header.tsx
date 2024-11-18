import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { Button } from "~/components/ui/button";
import { ExtendedUser } from "~/next-auth";

export function ProfileHeader({ user }: { user: ExtendedUser }) {
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
