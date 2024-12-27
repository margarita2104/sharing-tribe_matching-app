import { User } from "@prisma/client";
import { type ExtendedUser } from "~/next-auth";

export default function CandidateBio({ user }: { user: User }) {
  return (
    <>
      <div className="mb-8 flex items-center space-x-2">
        <h3 className="text-2xl text-purple-900">Short Bio:</h3>
        <p className="break-words text-xl text-slate-700">{user.bio}</p>
      </div>
    </>
  );
}
