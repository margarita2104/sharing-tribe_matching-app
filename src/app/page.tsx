import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export default async function HomePage() {
  return (
    <main>
      <AspectRatio ratio={16 / 5} className="bg-muted">
        <Image
          src="/images/home-hero.svg"
          alt="Hero Image"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <section className="my-12 flex flex-col items-center px-6">
        <h1 className="mb-6 text-2xl font-semibold text-violet md:text-3xl">
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

      <section className="flex flex-col-reverse items-center bg-gallery px-6 py-10 sm:flex-row">
        <div className="mt-6 flex w-full justify-center sm:mt-0 sm:w-1/2">
          <Image
            src="/images/home-perfect-match.svg"
            alt="Section illustration"
            width={300}
            height={300}
          />
        </div>
        <div className="w-full text-center sm:w-1/2 sm:text-left">
          <h2 className="mb-6 text-xl font-semibold text-violet md:text-2xl">
            Find Your Perfect Match
          </h2>
          <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
            Sharing Tribe is&nbsp;designed to&nbsp;help professionals build
            meaningful connections&nbsp;by:
          </p>
          <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
            <strong>Matching Complementary Skills: </strong>
            Our platform pairs individuals based on&nbsp;complementary hard and
            soft skills in&nbsp;the&nbsp;IT sector.
          </p>
          <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
            <strong>Personality Alignment:</strong>
            To&nbsp;ensure a&nbsp;successful and productive partnership,
            we&nbsp;encourage all users to&nbsp;take the DISC Personality Test.
            This test helps you understand your working style and connects you
            with a&nbsp;partner whose personality complements yours.
          </p>
          <p className="mb-3 text-sm leading-7 md:text-base md:leading-9">
            <strong>Flexible Work Opportunities:</strong>
            Whether you&rsquo;re looking for part-time collaboration
            or&nbsp;project-based partnerships, we&nbsp;help you find the right
            person to&nbsp;share the journey.
          </p>
        </div>
      </section>

      <section className="my-10 px-6 md:px-12">
        <h2 className="mb-6 text-center text-xl font-semibold text-violet md:text-2xl">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:px-[50px] md:grid-cols-2 md:gap-6 md:px-[100px] lg:grid-cols-2 lg:gap-4 lg:px-[200px]">
          {[
            {
              title: "Sign Up & Create Your Profile",
              text: "Provide information about your professional background, skills, and career goals.",
              image: "/images/home-how-works-1.svg",
            },
            {
              title: "Take the DISC Personality Test",
              text: "Understanding your personality is key to a successful partnership. The DISC test provides insight into your strengths and working style, allowing us to find a partner with complementary traits.",
              image: "/images/home-how-works-2.svg",
            },
            {
              title: "Find Your Match",
              text: "Our platform uses advanced matching algorithms to suggest professionals with the skills, experience, and personality traits that align with yours.",
              image: "/images/home-how-works-3.svg",
            },
            {
              title: "Start Collaborating",
              text: "Connect with your match and start working together on exciting projects, job-sharing opportunities, or skill exchanges.",
              image: "/images/home-how-works-4.svg",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex w-full flex-col justify-between rounded-lg border border-alto px-6 py-6 md:px-8 md:py-8 lg:px-6 lg:py-6"
            >
              <div className="mb-4 md:mb-6">
                <h3 className="mb-3 text-lg font-semibold md:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 md:text-base md:leading-8">
                  {item.text}
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={130}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center px-6">
        <h2 className="mb-6 text-center text-xl font-semibold text-violet md:text-2xl">
          Ready to&nbsp;Find Your Perfect Partner?
        </h2>
        <p className="mb-12 w-4/5 text-center text-sm leading-7 md:w-2/3 md:text-base md:leading-9">
          Sign up&nbsp;today and take your career to&nbsp;the next level with
          Sharing Tribe. Together, we&rsquo;ll help you find the ideal partner
          to&nbsp;achieve your goals.
        </p>
        <section className="flex justify-center">
          <Link
            href="/disc"
            className="rounded-lg border border-alto bg-tree-poppy px-8 py-2 text-lg font-semibold hover:bg-flush-orange md:px-14 md:py-4 md:text-xl"
          >
            Start DISC Test
          </Link>
        </section>
        <Image
          src="/images/home-perfect-partner.svg"
          alt="Section illustration"
          width={710}
          height={400}
          className="mt-8 w-full max-w-[500px] md:max-w-[710px]"
        />
      </section>
    </main>
  );
}
