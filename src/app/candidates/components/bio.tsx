import type { User } from "@prisma/client";

export default function CandidateBio({ user }: { user: User }) {
  return (
    <>
      <div className="mb-8 flex justify-center items-center space-x-2">
        <h3 className="text-2xl text-purple-900">Short Bio:</h3>
        <p className="break-words text-xl text-slate-700">{user.bio}</p>
      </div>
    </>
  );
}
