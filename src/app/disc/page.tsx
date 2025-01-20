import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";

const Disc = () => {
  return (
    <main>
      <AspectRatio ratio={16 / 8} className="bg-muted">
        <Image
          src="/images/disc-hero.svg"
          alt="Hero Image"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <section className="flex flex-col items-center px-6">
        <h1 className="m-10 text-center text-2xl font-semibold text-violet md:text-4xl">
          Discover Your Working Style
        </h1>
        <p className="text-center text-sm leading-7 md:w-3/4 md:text-base md:leading-9">
          At&nbsp;Sharing Tribe, we&nbsp;believe that understanding your
          personality is&nbsp;the key to&nbsp;finding the perfect professional
          match. <strong>The DISC Personality Test</strong> is&nbsp;designed
          to&nbsp;help you gain insight into your working style, strengths, and
          how you collaborate with others. By&nbsp;completing this test,
          you&rsquo;ll receive a&nbsp;personalized profile that will assist
          in&nbsp;finding a&nbsp;partner who complements your skills and
          approach.
        </p>
      </section>
      <section className="grid grid-cols-1 place-items-center gap-10 bg-gallery px-14 py-8 md:grid-cols-2">
        <div className="w-full">
          <h2 className="mb-6 text-center text-2xl font-semibold text-violet">
            What is&nbsp;the DISC Personality Test?
          </h2>
          <p className="mb-3 leading-7">
            The DISC model is&nbsp;a&nbsp;widely recognized tool that identifies
            four key personality types:
            <strong> Dominance, Influence, Steadiness, </strong> and
            <strong> Conscientiousness</strong>.
          </p>
          <p className="mb-3 leading-7">
            Each type reflects how you respond to&nbsp;challenges, interact with
            others, pace your work, and approach rules and structure.
          </p>
          <p className="mb-3 leading-7">
            Understanding where you fall on&nbsp;the DISC spectrum helps you
            become more aware of&nbsp;your strengths and working preferences,
            as&nbsp;well as&nbsp;the type of&nbsp;partner who can complement
            your style.
          </p>
          <p className="mb-3 leading-7">
            This test is&nbsp;designed to&nbsp;help you understand your
            personality and working style so&nbsp;that we&nbsp;can match you
            with a&nbsp;professional who complements your strengths.
          </p>
        </div>
        <div className="flex w-full justify-center">
          <Image
            src="/images/disc-about.svg"
            alt="Section illustration"
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
      </section>
      <section className="px-12">
        <h2 className="mb-6 text-center text-2xl font-semibold text-violet">
          How the DISC Test Works
        </h2>
        <p className="mb-6 text-center leading-7">
          You will see 20&nbsp;questions, and for each question, you will have
          4&nbsp;statements; you need to&nbsp;choose one that feels MOST like
          you and one that feels LEAST like you.
        </p>
        <p className="mb-6 text-center leading-7">
          <strong>Tips for Accurate Results: </strong>
          Don&rsquo;t overthink your answers&mdash;go with your first instinct.
          There are no&nbsp;right or&nbsp;wrong answers; simply choose what
          feels most natural. Be&nbsp;honest with yourself to&nbsp;ensure your
          DISC profile accurately reflects your true working style.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-alto px-10 py-9">
            <div className="mb-6">
              <h3 className="mb-6 text-center text-xl font-semibold">
                20 Questions
              </h3>
              <p className="text-center">
                The test consists of 20 simple, multiple-choice questions
                designed to measure your personality traits.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/icons/disc-icon-1.svg"
                alt="Section icon"
                width={65}
                height={57}
              />
            </div>
          </div>
          <div className="rounded-lg border border-alto px-10 py-9">
            <div className="mb-6">
              <h3 className="mb-6 text-center text-xl font-semibold">
                Quick &amp;&nbsp;Easy
              </h3>
              <p className="text-center">
                The test takes approximately 10&nbsp;minutes to&nbsp;complete.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/icons/disc-icon-2.svg"
                alt="Section icon"
                width={65}
                height={65}
              />
            </div>
          </div>
          <div className="rounded-lg border border-alto px-10 py-9">
            <div className="mb-6">
              <h3 className="mb-6 text-center text-xl font-semibold">
                Personalized Report
              </h3>
              <p className="text-center">
                Once you&rsquo;ve completed the test, you&rsquo;ll receive
                a&nbsp;profile explaining your dominant traits and how they
                influence your work style.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/icons/disc-icon-3.svg"
                alt="Section icon"
                width={47}
                height={65}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <Link
          href="/disc/job-roles"
          className="rounded-lg border border-alto bg-tree-poppy px-12 py-3 text-xl font-semibold hover:bg-flush-orange md:px-14 md:py-5"
        >
          Start DISC Test
        </Link>
      </section>
      <section className="flex justify-center text-center">
        <Link
          href="mailto:contact@sharingtribe.tech"
          className="border-b-2 border-transparent text-xl font-semibold hover:border-b-2 hover:border-tree-poppy"
        >
          Have a&nbsp;question about the DISC test? Ask&nbsp;us
        </Link>
      </section>
    </main>
  );
};

export default Disc;
