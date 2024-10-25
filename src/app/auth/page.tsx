"use client";
import { FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";
import { TfiEmail } from "react-icons/tfi";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { TbTargetArrow } from "react-icons/tb";
import { TbMailOpenedFilled } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { redirect, useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
  return (
    <>
      <h2 className="mb-4 mt-10 text-center text-2xl text-violet md:text-6xl">
        Join our talent network
      </h2>
      <div className="mt-10 flex min-w-96 flex-col items-start space-y-4">
        <Button
          onClick={() =>
            signIn("google", {
              callbackUrl: `/`,
            })
          }
          variant="outline"
          asChild
          className="flex w-full cursor-pointer justify-start"
        >
          <div>
            <FcGoogle />
            <p className="w-full text-center">Sign in with Google</p>
          </div>
        </Button>
        <Button
          onClick={() =>
            signIn("linkedin", {
              callbackUrl: `/`,
            })
          }
          variant="outline"
          asChild
          className="flex w-full cursor-pointer justify-start"
        >
          <div>
            <FaLinkedin color="#0077B5" />
            <p className="w-full text-center">Sign in with Linkedin</p>
          </div>
        </Button>
        <Button
          variant="outline"
          asChild
          className="flex w-full cursor-pointer justify-start"
          onClick={() => router.push("/auth/register")}
        >
          <div>
            <TfiEmail />
            <p className="w-full text-center">Sign in with Email</p>
          </div>
        </Button>
        <Button
          size="sm"
          variant="link"
          asChild
          className="w-full px-0 font-normal"
        >
          <Link href="/auth/login">Already have an account? Sign up</Link>
        </Button>
      </div>
      <div className="mt-16 hidden space-x-8 lg:flex lg:flex-wrap lg:justify-center">
        <CardUI
          title="Onboarding Start Sheet"
          description="Kickstart your journey with an onboarding guide that helps you optimize your profile and get matched with ideal job-sharing or part-time opportunities."
        >
          <TbTargetArrow
            color="black"
            className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-tree-poppy p-4 text-5xl text-violet"
          />
        </CardUI>
        <CardUI
          title="Monthly Newsletter with Exclusive Tips and Content"
          description="Stay ahead with expert tips, industry insights, and exclusive content to grow your career in Switzerland's IT sector."
        >
          <TbMailOpenedFilled
            color="black"
            className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-tree-poppy p-4 text-5xl text-violet"
          />
        </CardUI>
        <CardUI
          title="Early Invitations to Events"
          description="Get early access to events and webinars on job-sharing, networking, and professional growth "
        >
          <IoCalendarOutline
            color="black"
            className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-tree-poppy p-4 text-5xl text-violet"
          />
        </CardUI>
        <CardUI
          title="Opportunities to Expand Your Network"
          description="Connect with professionals and industry experts to build your network and discover collaboration opportunities."
        >
          <FaUsers
            color="black"
            className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-tree-poppy p-4 text-5xl text-violet"
          />
        </CardUI>
      </div>
    </>
  );
}

type CardUIProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

function CardUI({ children, title, description }: CardUIProps) {
  return (
    <Card className="relative mb-2 h-auto w-[250px]">
      {children}
      <CardHeader className="mt-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
