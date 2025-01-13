import Image from "next/image";
import { getUserFiltered } from "~/actions/profile";

import Link from "next/link";
import { Button } from "~/components/ui/button";

const Candidates = async () => {
  const userss = await getUserFiltered();

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
      <ul
        role="list"
        className="mx-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {userss.map((person) => (
          <li
            key={person.id}
            className="relative col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm"
          >
            <div className="absolute right-0 top-0 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-tree-poppy text-center text-purple-800">
              <span className="text-center">{person.discTestResult}</span>
            </div>
            <div className="flex flex-1 flex-col p-8">
              <Image
                alt=""
                src={person.image ?? "/icons/default-avatar.png"}
                className="mx-auto size-32 shrink-0 rounded-full"
                width={100}
                height={100}
                quality={100}
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {person.name}
              </h3>
              <dl className="mt-1 flex grow flex-col justify-between">
                {person.jobTitle ? (
                  <>
                    <dt className="sr-only">Title</dt>
                    <dd className="text-sm text-gray-500">
                      {person.jobTitle}
                    </dd>{" "}
                  </>
                ) : null}

                <dt className="sr-only">Role</dt>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-tree-poppy/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20">
                    {person.bio}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <Button asChild variant="secondary" className="w-full">
                <Link
                  className="rounded-lg border border-alto bg-tree-poppy px-7 py-3 font-semibold hover:bg-flush-orange"
                  href={`/candidates/${person.id}`}
                >
                  View Profile
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Candidates;
