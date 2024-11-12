import Image from "next/image";
import Link from "next/link";

const DiscAbout = () => {
  return (
    <main>
      <section className="hero">
        <Image
          src="/images/disc-about-page.svg"
          alt="Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-violet">
          DISC Personality Test
        </h1>
        <p className="w-2/4 text-center">
          This test is&nbsp;designed to&nbsp;help you understand your
          personality and working style so&nbsp;that we&nbsp;can match you with
          a&nbsp;professional who complements your strengths. The test consists
          of&nbsp;<strong>20&nbsp;questions</strong>, each with a&nbsp;set
          of&nbsp;statements.
        </p>
      </section>
      <section className="flex flex-col items-center bg-gallery px-10 py-10">
        <h2 className="mb-6 text-2xl font-semibold text-violet">
          What is&nbsp;the DISC Personality Test?
        </h2>
        <div className="flex">
          <div className="flex w-1/2 flex-col items-center">
            <p className="mb-7 w-1/2 text-center">
              Select the statement that is&nbsp;<strong>MOST</strong> true for
              you (The one that best describes how you naturally behave
              in&nbsp;a&nbsp;work setting).
            </p>
            <Image
              src="/images/disc-about-yes.svg"
              alt="Section illustration"
              width={130}
              height={150}
            />
          </div>
          <div className="flex w-1/2 flex-col items-center">
            <p className="mb-7 w-1/2 text-center">
              Select the statement that is&nbsp;<strong>LEAST</strong> true for
              you (The one that feels the least like you or&nbsp;doesn&rsquo;t
              apply as&nbsp;much).
            </p>
            <Image
              src="/images/disc-about-no.svg"
              alt="Section illustration"
              width={140}
              height={150}
            />
          </div>
        </div>
      </section>
      <section className="px-10">
        <div className="rounded-lg border border-alto p-11">
          <div className="mb-6 flex justify-between">
            <h2 className="mb-6 text-2xl font-semibold text-violet">
              Tips for Accurate Results:
            </h2>
            <Image
              src="/icons/disc-about-lightbulb.svg"
              alt="Section illustration"
              width={100}
              height={100}
            />
          </div>
          <div className="flex justify-between gap-36">
            <p>
              Don&rsquo;t overthink your answers&mdash;go with your first
              instinct.
            </p>
            <p>
              There are no&nbsp;right or&nbsp;wrong answers, just choose what
              feels most natural.
            </p>
            <p>
              Be&nbsp;honest with yourself to&nbsp;ensure your DISC profile
              reflects your true working style.
            </p>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <Link
          href="/disc/about/job-roles"
          className="rounded-lg border border-alto bg-tree-poppy px-14 py-5 text-xl font-semibold hover:bg-flush-orange"
        >
          Start DISC Test
        </Link>
      </section>
    </main>
  );
};

export default DiscAbout;
