import Image from "next/image";
import Link from "next/link";

const Disc = () => {
  return (
    <main>
      <section className="hero">
        <Image
          src="/images/disc-hero.svg"
          alt="Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-violet">
          Discover Your Working Style
        </h1>
        <p className="w-2/4 text-center">
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
      <section className="flex items-center bg-gallery px-10 py-10">
        <div className="w-1/2">
          <h2 className="mb-6 text-2xl font-semibold text-violet">
            What is&nbsp;the DISC Personality Test?
          </h2>
          <p className="mb-3">
            The DISC model is&nbsp;a&nbsp;widely recognized tool that identifies
            four key personality types:
            <strong> Dominance, Influence, Steadiness, </strong> and
            <strong> Conscientiousness</strong>.
          </p>
          <p className="mb-3">
            Each type reflects how you respond to&nbsp;challenges, interact with
            others, pace your work, and approach rules and structure.
          </p>
          <p className="mb-3">
            Understanding where you fall on&nbsp;the DISC spectrum helps you
            become more aware of&nbsp;your strengths and working preferences,
            as&nbsp;well as&nbsp;the type of&nbsp;partner who can complement
            your style.
          </p>
        </div>
        <div className="flex w-1/2 justify-center">
          <Image
            src="/images/disc-about.svg"
            alt="Section illustration"
            width={400}
            height={400}
          />
        </div>
      </section>
      <section className="px-12">
        <h2 className="mb-6 text-center text-2xl font-semibold text-violet">
          How the DISC Test Works
        </h2>
        <div className="flex flex-wrap justify-center gap-14">
          <div className="flex w-1/4 flex-col justify-between rounded-lg border border-alto px-10 py-9">
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
                width={130}
                height={114}
              />
            </div>
          </div>
          <div className="flex w-1/4 flex-col justify-between rounded-lg border border-alto px-10 py-9">
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
                width={130}
                height={130}
              />
            </div>
          </div>
          <div className="flex w-1/4 flex-col justify-between rounded-lg border border-alto px-10 py-9">
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
                width={94}
                height={130}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="px-36">
        <Link
          href="/disc/about"
          className="flex items-center justify-between rounded-lg border border-alto hover:bg-accent"
        >
          <h3 className="py-5 pl-10 text-xl font-semibold text-violet">
            Ready to&nbsp;take the test?
          </h3>
          <div className="flex items-center rounded-lg border border-alto">
            <div className="h-full border-r border-alto py-3 px-4">
              <Image
                src="/icons/test-yes.svg"
                alt="Section icon"
                width={40}
                height={50}
              />
            </div>
            <div className="h-full py-3 px-4">
              <Image
                src="/icons/test-no.svg"
                alt="Section icon"
                width={40}
                height={50}
              />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default Disc;
