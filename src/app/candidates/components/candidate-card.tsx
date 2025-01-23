import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

type Person = {
  person: {
    name: string | null;
    id: string;
    image: string | null;
    bio: string | null;
    discTestResult: string | null;
    jobTitle: string | null;
  };
};

export default async function CandidateCard({ person }: Person) {
  return (
    <>
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
            {person.bio ? (
              <>
                <dt className="sr-only">Role</dt>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-tree-poppy/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20">
                    {person.bio}
                  </span>
                </dd>
              </>
            ) : null}
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
    </>
  );
}
