import Image from "next/image";
import { getUserFiltered } from "~/actions/profile";
import CandidateCard from "./components/candidate-card";
import { Suspense } from "react";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import { AspectRatio } from "~/components/ui/aspect-ratio";

const Candidates = async () => {
  const userss = await getUserFiltered();
  return (
    <main>
      <AspectRatio ratio={16 / 5} className="bg-muted">
        <Image
          src="/images/candidates-hero.svg"
          alt="Hero Image"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <section className="flex flex-col items-center px-6">
        <h1 className="m-10 text-2xl font-semibold text-violet md:text-4xl">
          Candidates
        </h1>
        <p className="text-center text-sm leading-7 md:w-3/4 md:text-base md:leading-9">
          Discover professionals who share your interests, skills, and goals.
          Build meaningful connections, collaborate on&nbsp;exciting projects,
          and explore job-sharing opportunities that align with your work style
          and expertise.
        </p>
      </section>
      <ul
        role="list"
        className="mx-8 mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {userss.map((person) => (
          <Suspense key={person.id} fallback={<LoadingSpinner />}>
            <CandidateCard key={person.id} person={person} />
          </Suspense>
        ))}
      </ul>
    </main>
  );
};

export default Candidates;
