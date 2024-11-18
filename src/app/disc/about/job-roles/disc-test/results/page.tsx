import Image from "next/image";

const Results = () => {
  return (
    <main>
      <section className="hero">
        <Image
          src="/images/disc-results-hero.svg"
          alt="Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-violet">
          DISC Personality Test Results
        </h1>
        <p className="mb-5 w-2/4 text-center">
          Congratulations on&nbsp;completing the DISC Personality Test! Based
          on&nbsp;your answers, we&rsquo;ve generated your personalized DISC
          profile, which outlines your unique strengths and working style.
        </p>
        <p className="w-2/4 text-center">
          Your profile will help&nbsp;us match you with professionals who
          complement your traits, ensuring a&nbsp;productive and successful
          partnership.
        </p>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="mb-6 text-2xl font-semibold text-violet">
          Your result is: Dominance (D)
        </h2>
        <p className="w-3/4">
          <strong>Overview: </strong> Dominant personalities are natural leaders
          who focus on&nbsp;results, challenges, and action. They are assertive,
          decisive, and thrive in&nbsp;competitive environments.
        </p>
        <div className="flex">
          {/* <div className="w-1/2">
            <h2 className="mb-6 text-2xl font-semibold text-violet">
              What is&nbsp;the DISC Personality Test?
            </h2>
            <p className="mb-3">
              The DISC model is&nbsp;a&nbsp;widely recognized tool that
              identifies four key personality types:
              <strong> Dominance, Influence, Steadiness, </strong> and
              <strong> Conscientiousness</strong>.
            </p>
            <p className="mb-3">
              Each type reflects how you respond to&nbsp;challenges, interact
              with others, pace your work, and approach rules and structure.
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
          </div> */}
        </div>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="mb-6 text-2xl font-semibold text-violet">
          What’s Next?
        </h2>
        <p className="w-2/4 text-center">
          Explore potential matches on&nbsp;the platform, and start building
          valuable connections that align with your DISC profile. The perfect
          professional partner is&nbsp;just a&nbsp;click away!
        </p>
      </section>
    </main>
  );
};

export default Results;
