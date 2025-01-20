"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
        <h2 className="mb-6 text-2xl font-semibold text-violet">
          What’s Next?
        </h2>
        <p className="mb-6 w-2/4 text-center">
          Explore potential matches on&nbsp;the platform, and start building
          valuable connections that align with your DISC profile. The perfect
          professional partner is&nbsp;just a&nbsp;click away!
        </p>
        <a
          href={link}
          className="rounded-lg border border-alto bg-tree-poppy px-7 py-3 font-semibold hover:bg-flush-orange"
        >
          {buttonText}
        </a>
      </section>
    );
  };

  if (!result) {
    return (
      <main>
        <AspectRatio ratio={16 / 8} className="bg-muted">
          <Image
            src="/images/disc-results-hero.svg"
            alt="Hero Image"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
        <section className="flex flex-col items-center">
          <h1 className="m-10 text-center text-2xl font-semibold text-violet md:text-4xl">
            DISC Personality Test Results
          </h1>
          <p className="mt-4 text-center text-xl">
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
            <h2 className="mb-6 text-2xl font-semibold text-violet">
              Your result is: Dominance (D)
            </h2>
            <p className="w-3/4">
              <strong>Overview: </strong> Dominant personalities are natural
              leaders who focus on&nbsp;results, challenges, and action. They
              are assertive, decisive, and thrive in&nbsp;competitive
              environments.
            </p>
            <div className="mt-4 grid grid-cols-1 place-items-center justify-items-center gap-8 px-12 py-8 lg:grid-cols-2">
              <div className="w-full">
                <p className="mb-3 leading-7">
                  <strong>Strengths:</strong> <br />
                  &bull; Goal-oriented and driven by&nbsp;success
                  <br /> &bull; Confident in&nbsp;decision-making, even under
                  pressure
                  <br /> &bull; Enjoy taking charge and overcoming obstacles
                  <br />
                  &bull; Comfortable taking risks and pushing boundaries
                  <br /> &bull; Good at&nbsp;handling problems and finding
                  solutions quickly
                </p>
                <p className="mb-3 leading-7">
                  <strong>Areas for Improvement:</strong>
                  <br />
                  &bull; May be&nbsp;too blunt or&nbsp;direct
                  in&nbsp;communication
                  <br />
                  &bull; Can come across as&nbsp;impatient or&nbsp;aggressive
                  <br />
                  &bull; May overlook details or&nbsp;other people&rsquo;s input
                  in&nbsp;pursuit of&nbsp;their goals
                  <br />
                  &bull; Can be&nbsp;seen as&nbsp;overly competitive
                  or&nbsp;controlling
                  <br />
                </p>
                <p className="mb-3 leading-7">
                  <strong> Motivators:</strong>
                  <br />
                  &bull; Challenges and winning
                  <br /> &bull; Opportunities to&nbsp;take charge
                  <br /> &bull; Achieving tangible results
                </p>
              </div>
              <div className="mr-10 flex w-full justify-center">
                <Image
                  src="/images/disc-results-d.svg"
                  alt="Section illustration"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );
      case "I":
        return (
          <section className="flex flex-col items-center">
            <h2 className="m-10 text-center text-2xl font-semibold text-violet md:text-4xl">
              Your result is: Influence (I)
            </h2>
            <p className="w-3/4">
              <strong>Overview: </strong> Influence personalities are outgoing,
              enthusiastic, and people-focused. They excel in&nbsp;social
              situations and enjoy motivating and inspiring others.
            </p>
            <div className="mt-4 grid grid-cols-1 place-items-center justify-items-center gap-8 px-12 py-8 lg:grid-cols-2">
              <div className="w-full">
                <p className="mb-3 leading-7">
                  <strong>Strengths:</strong> <br />
                  &bull; Great at&nbsp;building relationships and networking
                  <br />
                  &bull; Optimistic, positive, and good at&nbsp;rallying others
                  <br />
                  &bull; Charismatic and persuasive
                  <br />
                  &bull; Enjoys collaboration and teamwork
                  <br />
                  &bull; Open-minded and adaptable
                  <br />
                </p>
                <p className="mb-3 leading-7">
                  <strong>Areas for Improvement:</strong>
                  <br />
                  &bull; May become disorganized or&nbsp;lack follow-through
                  on&nbsp;tasks
                  <br />
                  &bull; Can be&nbsp;overly focused on&nbsp;social approval and
                  recognition
                  <br />
                  &bull; May overlook details or&nbsp;accuracy in&nbsp;favor
                  of&nbsp;big ideas
                  <br />
                  &bull; Tends to&nbsp;avoid conflict, even when necessary
                  <br />
                </p>
                <p className="mb-3 leading-7">
                  <strong> Motivators:</strong>
                  <br />
                  &bull; Social recognition and praise
                  <br />
                  &bull; Group activities and collaboration
                  <br />
                  &bull; Freedom to&nbsp;express creativity and ideas
                  <br />
                </p>
              </div>
              <div className="mr-10 flex w-full justify-center">
                <Image
                  src="/images/disc-results-i.svg"
                  alt="Section illustration"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );
      case "S":
        return (
          <section className="flex flex-col items-center">
            <h2 className="m-10 text-center text-2xl font-semibold text-violet md:text-4xl">
              Your result is: Steadiness (S)
            </h2>
            <p className="w-3/4">
              <strong>Overview: </strong> Steadiness personalities are
              dependable, calm, and cooperative. They value stability,
              consistency, and strong relationships, preferring a&nbsp;slower,
              steady pace.
            </p>
            <div className="mt-4 grid grid-cols-1 place-items-center justify-items-center gap-8 px-12 py-8 lg:grid-cols-2">
              <div className="w-full">
                <p className="mb-3 leading-7">
                  <strong>Strengths:</strong> <br />
                  &bull; Reliable and loyal, focused on&nbsp;long-term
                  relationships
                  <br />
                  &bull; Good listeners who care about others&rsquo; well-being
                  <br />
                  &bull; Patient, supportive, and excellent team players
                  <br />
                  &bull; Consistent and methodical in&nbsp;their work
                  <br />
                  &bull; Avoids conflict and works to&nbsp;maintain harmony
                  <br />
                </p>
                <p className="mb-3 leading-7">
                  <strong>Areas for Improvement:</strong>
                  <br />
                  &bull; May resist change or&nbsp;new challenges
                  <br />
                  &bull; Can be&nbsp;too passive, avoiding confrontation even
                  when needed
                  <br />
                  &bull; May have difficulty making quick decisions
                  <br />
                  &bull; Can prioritize relationships over personal
                  or&nbsp;professional growth
                  <br />
                </p>
                <p className="mb-3 leading-7">
                  <strong> Motivators:</strong>
                  <br />
                  &bull; Stable, harmonious environments
                  <br />
                  &bull; Clear expectations and routines
                  <br />
                  &bull; Opportunities to&nbsp;support and help others
                  <br />
                </p>
              </div>
              <div className="mr-10 flex w-full justify-center">
                <Image
                  src="/images/disc-results-s.svg"
                  alt="Section illustration"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );
      case "C":
        return (
          <section className="flex flex-col items-center">
            <h2 className="m-10 text-center text-2xl font-semibold text-violet md:text-4xl">
              Your result is: Conscientiousness (C)
            </h2>
            <p className="w-3/4">
              <strong>Overview: </strong> Conscientious personalities are
              detail-oriented, analytical, and focused on&nbsp;quality. They
              value accuracy, precision, and consistency in&nbsp;their work.
            </p>
            <div className="mt-4 grid grid-cols-1 place-items-center justify-items-center gap-8 px-12 py-8 lg:grid-cols-2">
              <div className="w-full">
                <p className="mb-3 leading-7">
                  <strong>Strengths:</strong> <br />
                  &bull; Strong attention to&nbsp;detail and focus
                  on&nbsp;accuracy
                  <br />
                  &bull; Logical, analytical, and thorough
                  in&nbsp;decision-making
                  <br />
                  &bull; Follows procedures and guidelines carefully
                  <br />
                  &bull; Dependable and organized in&nbsp;handling tasks
                  <br />
                  &bull; Values quality and works to&nbsp;achieve high standards
                  <br />
                </p>
                <p className="mb-3 leading-7">
                  <strong>Areas for Improvement:</strong>
                  <br />
                  &bull; May become overly critical or&nbsp;perfectionistic
                  <br />
                  &bull; Can be&nbsp;slow to&nbsp;make decisions, especially
                  if&nbsp;not all data is&nbsp;available
                  <br />
                  &bull; May struggle with adapting to&nbsp;changes
                  or&nbsp;ambiguity
                  <br />
                  &bull; Can appear overly cautious or&nbsp;rigid
                  <br />
                </p>
                <p className="mb-3 leading-7">
                  <strong> Motivators:</strong>
                  <br />
                  &bull; Clear rules, standards, and procedures
                  <br />
                  &bull; Opportunities to&nbsp;work on&nbsp;precise,
                  detail-oriented tasks
                  <br />
                  &bull; Autonomy to&nbsp;work at&nbsp;their own pace
                  <br />
                </p>
              </div>
              <div className="mr-10 flex w-full justify-center">
                <Image
                  src="/images/disc-results-c.svg"
                  alt="Section illustration"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );
      default:
        return (
          <p>
            Your result doesn&rsquo;t match any known category. Please contact
            support.
          </p>
        );
    }
  };

  return (
    <main>
      <AspectRatio ratio={16 / 8} className="bg-muted">
        <Image
          src="/images/disc-results-hero.svg"
          alt="Hero Image"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <section className="flex flex-col items-center">
        <h1 className="m-10 text-center text-2xl font-semibold text-violet md:text-4xl">
          DISC Personality Test Results
        </h1>
        <p className="text-center text-sm leading-7 md:w-3/4 md:text-base md:leading-9">
          Congratulations on&nbsp;completing the DISC Personality Test! Based
          on&nbsp;your answers, we&rsquo;ve generated your personalized DISC
          profile, which outlines your unique strengths and working style.
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
