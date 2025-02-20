"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { similarCandidates } from "~/actions/similar-candidates";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { useCurrentUser } from "~/hooks/use-current-user";

const Results = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const [result, setResult] = useState<string | null>(null);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setResult(query.get("mostAnsweredLetter"));
  }, []);

  const renderWhatsNext = () => {
    const link = user ? "/candidates" : "/join";
    const buttonText = user ? "Find Candidates" : "Join Now";

    return (
      <section className="flex flex-col items-center">
        <h2 className="mb-6 text-xl font-semibold text-violet md:text-2xl">
          What’s Next?
        </h2>
        <p className="mb-6 w-2/4 text-center text-sm leading-7 md:text-base md:leading-9">
          Explore potential matches on&nbsp;the platform, and start building
          valuable connections that align with your DISC profile. The perfect
          professional partner is&nbsp;just a&nbsp;click away!
        </p>
        <a
          href={link}
          className="rounded-lg border border-alto bg-tree-poppy px-7 py-3 text-sm font-semibold hover:bg-flush-orange md:text-base"
        >
          {buttonText}
        </a>
      </section>
    );
  };

  if (!result) {
    return (
      <main className="w-full">
        <AspectRatio ratio={16 / 5} className="bg-muted">
          <Image
            src="/images/disc-results-hero.svg"
            alt="Hero Image"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
        <section className="flex flex-col items-center">
          <h1 className="m-10 text-center text-xl font-semibold text-violet md:text-4xl">
            DISC Personality Test Results
          </h1>
          <p className="mt-4 text-center text-sm leading-7 md:text-base md:leading-9">
            Oops! It&nbsp;looks like there&rsquo;s an&nbsp;issue retrieving your
            result. Please retake the test or&nbsp;contact support.
          </p>
        </section>
      </main>
    );
  }

  const renderResultSection = () => {
    switch (result) {
      case "D":
        return (
          <section className="flex flex-col items-center">
            <h2 className="m-10 text-center text-xl font-semibold text-violet md:text-2xl">
              Your result is: Dominance (D)
            </h2>
            <p className="w-3/4 text-sm leading-7 md:text-base md:leading-9">
              <strong>Overview: </strong> Dominant personalities are natural
              leaders who focus on results, challenges, and action. They are
              assertive, decisive, and thrive in competitive environments.
            </p>
            <div className="mt-4 grid grid-cols-1 place-items-center gap-8 px-12 py-8 lg:grid-cols-2">
              <div className="w-full">
                <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
                  <strong>Strengths:</strong> <br />
                  &bull; Goal-oriented and driven by success <br />
                  &bull; Confident in decision-making, even under pressure{" "}
                  <br />
                  &bull; Enjoy taking charge and overcoming obstacles <br />
                </p>
                <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
                  <strong>Areas for Improvement:</strong> <br />
                  &bull; May be too blunt in communication <br />
                  &bull; Can come across as impatient or aggressive <br />
                </p>
              </div>
              <div className="mr-10 flex w-full justify-center">
                <Image
                  src="/images/disc-results-d.svg"
                  alt="Section illustration"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );

      case "I":
        return (
          <section className="flex flex-col items-center">
            <h2 className="m-10 text-center text-xl font-semibold text-violet md:text-2xl">
              Your result is: Influence (I)
            </h2>
            <p className="w-3/4 text-sm leading-7 md:text-base md:leading-9">
              <strong>Overview: </strong> Influence personalities are outgoing,
              enthusiastic, and people-focused. They excel in social situations
              and enjoy motivating and inspiring others.
            </p>
            <div className="mt-4 grid grid-cols-1 place-items-center gap-8 px-12 py-8 lg:grid-cols-2">
              <div className="w-full">
                <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
                  <strong>Strengths:</strong> <br />
                  &bull; Great at building relationships and networking <br />
                  &bull; Optimistic and positive <br />
                </p>
                <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
                  <strong>Areas for Improvement:</strong> <br />
                  &bull; May become disorganized or lack follow-through <br />
                  &bull; Can be overly focused on social approval <br />
                </p>
              </div>
              <div className="mr-10 flex w-full justify-center">
                <Image
                  src="/images/disc-results-i.svg"
                  alt="Section illustration"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );

      case "S":
        return (
          <section className="flex flex-col items-center">
            <h2 className="m-10 text-center text-xl font-semibold text-violet md:text-2xl">
              Your result is: Steadiness (S)
            </h2>
            <p className="w-3/4 text-sm leading-7 md:text-base md:leading-9">
              <strong>Overview: </strong> Steadiness personalities are
              dependable, calm, and cooperative. They value stability,
              consistency, and strong relationships.
            </p>
            <div className="mt-4 grid grid-cols-1 place-items-center gap-8 px-12 py-8 lg:grid-cols-2">
              <div className="w-full">
                <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
                  <strong>Strengths:</strong> <br />
                  &bull; Reliable and loyal <br />
                  &bull; Good listeners who care about others <br />
                </p>
                <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
                  <strong>Areas for Improvement:</strong> <br />
                  &bull; May resist change <br />
                  &bull; Can be too passive in conflict situations <br />
                </p>
              </div>
              <div className="mr-10 flex w-full justify-center">
                <Image
                  src="/images/disc-results-s.svg"
                  alt="Section illustration"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );

      case "C":
        return (
          <section className="flex flex-col items-center">
            <h2 className="m-10 text-center text-xl font-semibold text-violet md:text-2xl">
              Your result is: Conscientiousness (C)
            </h2>
            <p className="w-3/4 text-sm leading-7 md:text-base md:leading-9">
              <strong>Overview: </strong> Conscientious personalities are
              detail-oriented, analytical, and focused on quality. They value
              accuracy, precision, and consistency in their work.
            </p>
            <div className="mt-4 grid grid-cols-1 place-items-center gap-8 px-12 py-8 lg:grid-cols-2">
              <div className="w-full">
                <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
                  <strong>Strengths:</strong> <br />
                  &bull; Strong attention to detail <br />
                  &bull; Logical, analytical, and thorough <br />
                </p>
                <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
                  <strong>Areas for Improvement:</strong> <br />
                  &bull; May become overly critical or perfectionistic <br />
                  &bull; Can struggle with adapting to change <br />
                </p>
              </div>
              <div className="mr-10 flex w-full justify-center">
                <Image
                  src="/images/disc-results-c.svg"
                  alt="Section illustration"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );

      default:
        return (
          <p className="text-sm leading-7 md:text-base md:leading-9">
            Your result doesn’t match any known category. Please contact
            support.
          </p>
        );
    }
  };

  return (
    <main className="w-full">
      <AspectRatio ratio={16 / 5} className="bg-muted">
        <Image
          src="/images/disc-results-hero.svg"
          alt="Hero Image"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <section className="flex flex-col items-center">
        <h1 className="m-10 text-center text-xl font-semibold text-violet md:text-4xl">
          DISC Personality Test Results
        </h1>
        <p className="text-center text-sm leading-7 md:w-3/4 md:text-base md:leading-9">
          Congratulations on&nbsp;completing the DISC Personality Test! Based
          on&nbsp;your answers, we’ve generated your personalized DISC profile,
          which outlines your unique strengths and working style.
        </p>
        <p className="text-center text-sm leading-7 md:w-3/4 md:text-base md:leading-9">
          Your profile will help&nbsp;us match you with professionals who
          complement your traits, ensuring a&nbsp;productive and successful
          partnership.
        </p>
      </section>

      {renderResultSection()}
      {renderWhatsNext()}
    </main>
  );
};

export default Results;
