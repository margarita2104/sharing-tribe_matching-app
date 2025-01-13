import Image from "next/image";
import { getUserFiltered } from "~/actions/profile";
import CandidateCard from "./components/candidate-card";
import { Suspense } from "react";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

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
          <Suspense key={person.id} fallback={<LoadingSpinner />}>
            <CandidateCard key={person.id} person={person} />
          </Suspense>
        ))}
      </ul>
    </main>
  );
};

export default Candidates;
