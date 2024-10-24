"use client";
import { FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";
import { TfiEmail } from "react-icons/tfi";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Auth() {
  return (
    <>
      <h2 className="mb-4 mt-10 text-6xl">Join our talent network</h2>
      <div className="mt-10 flex flex-col items-start space-y-4">
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
            <FaLinkedin />
            <p className="w-full text-center">Sign in with Linkedin</p>
          </div>
        </Button>
        <Button
          variant="outline"
          asChild
          className="flex w-full cursor-pointer justify-start"
        >
          <Link href="/sign/register">
            <TfiEmail />
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/sign/login">Already have an account? Signin</Link>
        </Button>
      </div>
    </>
  );
}
