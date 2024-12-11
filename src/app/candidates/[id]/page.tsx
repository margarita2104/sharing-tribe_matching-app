import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

interface CandidateProfileProps {
  params: {
    id: string;
  };
}

const CandidateProfile = async ({ params }: CandidateProfileProps) => {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      jobTitle: true,
      image: true,
      bio: true,
    },
  });

  if (!user) {
    return <p>Candidate not found</p>;
  }

  const [firstName, lastName] = user.name?.split(" ") ?? [];

  return (
    <main className="flex flex-col items-center p-6">
      <Image
        src={user.image ?? "/icons/default-avatar.png"}
        alt={user.name ?? "User"}
        width={150}
        height={150}
        className="mb-4 rounded-full"
      />
      <h1 className="text-2xl font-bold">
        {firstName} {lastName}
      </h1>
      <h2 className="text-lg text-gray-500">{user.jobTitle}</h2>
      <p className="mt-4 text-center">{user.bio ?? "No bio available."}</p>
    </main>
  );
};

export default CandidateProfile;

