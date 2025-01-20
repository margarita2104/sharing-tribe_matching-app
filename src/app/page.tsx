import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export default async function HomePage() {
  return (
    <main>
      <AspectRatio ratio={16 / 8} className="bg-muted">
        <Image
          src="/images/home-hero.svg"
          alt="Hero Image"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <section className="my-12 flex flex-col items-center px-6">
        <h1 className="mb-6 text-2xl font-semibold text-violet md:text-4xl">
          Welcome to Sharing Tribe
        </h1>
        <h3 className="text-md mb-6 font-semibold md:text-xl">
          Connecting Talents, Creating Synergy
        </h3>
        <p className="text-center text-sm leading-7 md:w-3/4 md:text-base md:leading-9">
          At&nbsp;Sharing Tribe, we&nbsp;bring together professionals
          in&nbsp;the&nbsp;IT industry with complementary skills and
          personalities to&nbsp;form dynamic, successful tandems. Whether
          you&rsquo;re seeking a&nbsp;partner to&nbsp;collaborate
          on&nbsp;projects, job share, or&nbsp;exchange expertise, our platform
          helps you find the perfect match for your career goals.
        </p>
      </section>
      {/* <section className="flex items-center bg-gallery px-10 py-10">
        <div className="flex w-1/2 justify-center">
          <Image
            src="/images/home-perfect-match.svg"
            alt="Section illustration"
            width={300}
            height={300}
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
      </section> */}

      <MatchingPartner />
      <section className="my-10 px-12">
        <h2 className="mb-6 text-center text-2xl font-semibold text-violet md:text-4xl">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex w-full flex-col justify-between rounded-lg border border-alto px-10 py-9">
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
                width={242}
                height={150}
              />
            </div>
          </div>
          <div className="flex w-full flex-col justify-between rounded-lg border border-alto px-10 py-9">
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
                width={242}
                height={150}
              />
            </div>
          </div>
          <div className="flex w-full flex-col justify-between rounded-lg border border-alto px-10 py-9">
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
                width={242}
                height={150}
              />
            </div>
          </div>
          <div className="flex w-full flex-col justify-between rounded-lg border border-alto px-10 py-9">
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
                width={242}
                height={150}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="mb-6 text-center text-2xl font-semibold text-violet">
          Ready to&nbsp;Find Your Perfect Partner?
        </h2>
        <p className="mb-12 w-2/3 text-center">
          Sign up&nbsp;today and take your career to&nbsp;the next level with
          Sharing Tribe. Together, we&rsquo;ll help you find the ideal partner
          to&nbsp;achieve your goals.
        </p>
        <section className="flex justify-center">
          <Link
            href="/disc"
            className="rounded-lg border border-alto bg-tree-poppy px-10 py-2 text-xl font-semibold hover:bg-flush-orange md:px-14 md:py-4"
          >
            Start DISC Test
          </Link>
        </section>
        <Image
          src="/images/home-perfect-partner.svg"
          alt="Section illustration"
          width={710}
          height={400}
        />
      </section>
    </main>
  );
}

const features = [
  {
    name: "Matching Complementary Skills:",
    description:
      " Our platform pairs individuals based on complementary hard and soft skills in the IT sector.",
    // icon: CloudArrowUpIcon,
  },
  {
    name: "Personality Alignment:",
    description:
      " To ensure a successful and productive partnership, we encourage all users to take the DISC Personality Test. This test helps you understand your working style and connects you with a partner whose personality complements yours.",
    // icon: LockClosedIcon,
  },
  {
    name: "Flexible Work Opportunities:",
    description:
      " Whether you’re looking for part-time collaboration or project-based partnerships, we help you find the right person to share the journey.",
    // icon: ServerIcon,
  },
];

function MatchingPartner() {
  return (
    <div className="overflow-hidden bg-gallery p-6 md:p-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 md:grid-cols-2 lg:mx-0 lg:max-w-none">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mb-6 text-center text-2xl font-semibold text-violet md:text-4xl">
                Find Your Perfect Match
              </p>
              <p className="text-md mb-6 text-center md:text-xl">
                Sharing Tribe is designed to help professionals build meaningful
                connections by:
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    {/* <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute left-1 top-1 size-5 text-indigo-600"
                      />
                      {feature.name}
                    </dt>{" "} */}
                    <dd className="inline">
                      <b>{feature.name}</b>
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            alt="Product screenshot"
            src="/images/home-perfect-match.svg"
            width={500}
            height={500}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
