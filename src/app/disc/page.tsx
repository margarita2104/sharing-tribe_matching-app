import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";

const Disc = () => {
  return (
    <main>
      <AspectRatio ratio={16 / 5} className="bg-muted">
        <Image
          src="/images/disc-hero.svg"
          alt="Hero Image"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>

      <section className="flex flex-col items-center px-6">
        <h1 className="m-10 text-center text-xl font-semibold text-violet md:text-4xl">
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

      <section className="grid grid-cols-1 place-items-center gap-10 bg-gallery px-6 py-8 md:grid-cols-2 md:px-14">
        <div className="w-full">
          <h2 className="mb-6 text-center text-xl font-semibold text-violet md:text-2xl">
            What is&nbsp;the DISC Personality Test?
          </h2>
          <p className="mb-3 text-sm leading-6 md:text-base md:leading-8">
            The DISC model is&nbsp;a&nbsp;widely recognized tool that identifies
            four key personality types:
            <strong> Dominance, Influence, Steadiness, </strong> and
            <strong> Conscientiousness</strong>.
          </p>
          <p className="mb-3 text-sm leading-6 md:text-base md:leading-8">
            Each type reflects how you respond to&nbsp;challenges, interact with
            others, pace your work, and approach rules and structure.
          </p>
          <p className="mb-3 text-sm leading-6 md:text-base md:leading-8">
            Understanding where you fall on&nbsp;the DISC spectrum helps you
            become more aware of&nbsp;your strengths and working preferences,
            as&nbsp;well as&nbsp;the type of&nbsp;partner who can complement
            your style.
          </p>
          <p className="mb-3 text-sm leading-6 md:text-base md:leading-8">
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
            className="h-full w-full max-w-[300px] object-cover md:max-w-[400px]"
          />
        </div>
      </section>

      <section className="px-6 md:px-12">
        <h2 className="mb-6 text-center text-xl font-semibold text-violet md:text-2xl">
          How the DISC Test Works
        </h2>
        <p className="mb-6 text-center text-sm leading-6 md:text-base md:leading-8">
          You will see 20&nbsp;questions, and for each question, you will have
          4&nbsp;statements; you need to&nbsp;choose one that feels MOST like
          you and one that feels LEAST like you.
        </p>
        <p className="mb-6 text-center text-sm leading-6 md:text-base md:leading-8">
          <strong>Tips for Accurate Results: </strong>
          Don&rsquo;t overthink your answers&mdash;go with your first instinct.
          There are no&nbsp;right or&nbsp;wrong answers; simply choose what
          feels most natural. Be&nbsp;honest with yourself to&nbsp;ensure your
          DISC profile accurately reflects your true working style.
        </p>
        <div className="lg:px-[200px] grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "20 Questions",
              text: "The test consists of 20 simple, multiple-choice questions designed to measure your personality traits.",
              icon: "/icons/disc-icon-1.svg",
            },
            {
              title: "Quick & Easy",
              text: "The test takes approximately 10 minutes to complete.",
              icon: "/icons/disc-icon-2.svg",
            },
            {
              title: "Personalized Report",
              text: "Once you’ve completed the test, you’ll receive a profile explaining your dominant traits and how they influence your work style.",
              icon: "/icons/disc-icon-3.svg",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg border border-alto px-6 py-6 md:px-10 md:py-9"
            >
              <div className="mb-6">
                <h3 className="mb-3 text-center text-lg font-semibold md:text-xl">
                  {item.title}
                </h3>
                <p className="text-center text-sm md:text-base">{item.text}</p>
              </div>
              <div className="flex justify-center">
                <Image
                  src={item.icon}
                  alt="Section icon"
                  width={65}
                  height={65}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 flex justify-center">
        <Link
          href="/disc/job-roles"
          className="rounded-lg border border-alto bg-tree-poppy px-8 py-3 text-lg font-semibold hover:bg-flush-orange md:px-14 md:py-5 md:text-xl"
        >
          Start DISC Test
        </Link>
      </section>

      <section className="mt-6 flex justify-center text-center">
        <Link
          href="mailto:contact@sharingtribe.tech"
          className="border-b-2 border-transparent text-lg font-semibold hover:border-b-2 hover:border-tree-poppy md:text-xl"
        >
          Have a&nbsp;question about the DISC test? Ask&nbsp;us
        </Link>
      </section>
    </main>
  );
};

export default Disc;
