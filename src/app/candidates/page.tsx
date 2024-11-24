import Image from "next/image";

const Candidates = () => {
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
    </main>
  );
};

export default Candidates;
