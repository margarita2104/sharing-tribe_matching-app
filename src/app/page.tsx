import Image from "next/image";

export default async function HomePage() {
  return (
    <main>
      <section className="hero">
        <Image
          src="/images/home-hero.svg"
          alt="Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-violet">
          Welcome to Sharing Tribe
        </h1>
        <h3 className="mb-6 text-xl font-semibold">
          Connecting Talents, Creating Synergy
        </h3>
        <p className="w-2/4 text-center">
          At&nbsp;Sharing Tribe, we&nbsp;bring together professionals
          in&nbsp;the&nbsp;IT industry with complementary skills and
          personalities to&nbsp;form dynamic, successful tandems. Whether
          you&rsquo;re seeking a&nbsp;partner to&nbsp;collaborate
          on&nbsp;projects, job share, or&nbsp;exchange expertise, our platform
          helps you find the perfect match for your career goals.
        </p>
      </section>
      <section className="bg-gallery flex items-center px-10 py-10">
        <div className="flex w-1/2 justify-center">
          <Image
            src="/images/home-perfect-match.svg"
            alt="Section illustration"
            width={400}
            height={400}
          />
        </div>
        <div className="w-1/2">
          <h2 className="mb-6 text-2xl font-semibold text-violet">
            Find Your Perfect Match
          </h2>
          <p className="mb-3">
            Sharing Tribe is&nbsp;designed to&nbsp;help professionals build
            meaningful connections&nbsp;by:
          </p>
          <p className="mb-3">
            <strong>Matching Complementary Skills: </strong>
            Our platform pairs individuals based on&nbsp;complementary hard and
            soft skills in&nbsp;the&nbsp;IT sector.
          </p>
          <p className="mb-3">
            <strong>Personality Alignment:</strong>
            To&nbsp;ensure a&nbsp;successful and productive partnership,
            we&nbsp;encourage all users to&nbsp;take the DISC Personality Test.
            This test helps you understand your working style and connects you
            with a&nbsp;partner whose personality complements yours.
          </p>
          <p className="mb-3">
            <strong>Flexible Work Opportunities:</strong>
            Whether you&rsquo;re looking for part-time collaboration
            or&nbsp;project-based partnerships, we&nbsp;help you find the right
            person to&nbsp;share the journey.
          </p>
        </div>
      </section>
      <section className="px-12">
        <h2 className="mb-6 text-center text-2xl font-semibold text-violet">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center gap-14">
          <div className="border-alto flex w-1/3 flex-col justify-between rounded-lg border px-10 py-9">
            <div className="mb-6">
              <h3 className="mb-6 text-xl font-semibold">
                Sign Up&nbsp;&amp;&nbsp;Create Your Profile
              </h3>
              <p>
                Provide information about your professional background, skills,
                and career goals.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/home-how-works-1.svg"
                alt="Section illustration"
                width={292}
                height={200}
              />
            </div>
          </div>
          <div className="border-alto flex w-1/3 flex-col justify-between rounded-lg border px-10 py-9">
            <div className="mb-6">
              <h3 className="mb-6 text-xl font-semibold">
                Take the DISC Personality Test
              </h3>
              <p>
                Understanding your personality is&nbsp;key
                to&nbsp;a&nbsp;successful partnership. The DISC test provides
                insight into your strengths and working style, allowing&nbsp;us
                to&nbsp;find a&nbsp;partner with complementary traits.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/home-how-works-2.svg"
                alt="Section illustration"
                width={292}
                height={200}
              />
            </div>
          </div>
          <div className="border-alto flex w-1/3 flex-col justify-between rounded-lg border px-10 py-9">
            <div className="mb-6">
              <h3 className="mb-6 text-xl font-semibold">Find Your Match</h3>
              <p>
                Our platform uses advanced matching algorithms to&nbsp;suggest
                professionals with the skills, experience, and personality
                traits that align with yours.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/home-how-works-3.svg"
                alt="Section illustration"
                width={292}
                height={200}
              />
            </div>
          </div>
          <div className="border-alto flex w-1/3 flex-col justify-between rounded-lg border px-10 py-9">
            <div className="mb-6">
              <h3 className="mb-6 text-xl font-semibold">
                Start Collaborating
              </h3>
              <p>
                Connect with your match and start working together
                on&nbsp;exciting projects, job-sharing opportunities,
                or&nbsp;skill exchanges.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/home-how-works-4.svg"
                alt="Section illustration"
                width={292}
                height={200}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="mb-6 text-2xl font-semibold text-violet">
          Ready to&nbsp;Find Your Perfect Partner?
        </h2>
        <p className="w-2/3 text-center mb-12">
          Sign up&nbsp;today and take your career to&nbsp;the next level with
          Sharing Tribe. Together, we&rsquo;ll help you find the ideal partner
          to&nbsp;achieve your goals.
        </p>
        <Image
          src="/images/home-perfect-partner.svg"
          alt="Section illustration"
          width={910}
          height={600}
        />
      </section>
    </main>
  );
}
