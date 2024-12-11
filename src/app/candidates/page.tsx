import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { getUserFiltered } from "~/actions/profile";
import Link from "next/link";

const prisma = new PrismaClient();

interface CandidatesProps {
  users: {
    id: string;
    name: string | null;
    jobTitle: string | null;
    image: string | null;
    bio: string | null;
  }[];
}

const Candidates = async () => {
  const userss = await getUserFiltered();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      jobTitle: true,
      image: true,
      bio: true,
    },
  });

  return (
    <main>
      <section className="hero">
        <Image
          src="/images/candidates-hero.svg"
          alt="Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-violet">Candidates</h1>
        <p className="w-2/4 text-center">
          Discover professionals who share your interests, skills, and goals.
          Build meaningful connections, collaborate on&nbsp;exciting projects,
          and explore job-sharing opportunities that align with your work style
          and expertise.
        </p>
      </section>
      <section className="mt-8 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const [firstName, lastName] = user.name?.split(" ") ?? [];

          return (
            <div
              key={user.id}
              className="flex flex-col items-center rounded-lg border p-4 text-center shadow-lg"
            >
              <Image
                src={user.image ?? "/icons/default-avatar.png"}
                alt={user.name ?? "User"}
                width={100}
                height={100}
                className="mb-4 rounded-full"
              />

              <h3 className="text-xl font-semibold">
                {firstName} {lastName}
              </h3>

              <p className="text-sm text-gray-500">{user.jobTitle}</p>

              <p className="mt-2 mb-4 text-sm text-gray-700">
                {user.bio ?? "No bio available."}
              </p>

              <Link href={`/candidates/${user.id}`} className="rounded-lg border border-alto bg-tree-poppy px-7 py-3 font-semibold hover:bg-flush-orange">
                View Profile
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Candidates;
