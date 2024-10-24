"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../../../schema/index";
import { FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import Link from "next/link";

export default function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="m-auto">
      <Card className="min-w-96 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="default" type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 flex space-x-2">
            <Button
              onClick={() => signIn("linkedin", { redirectTo: "/" })}
              variant="outline"
              className="w-full"
            >
              <FaLinkedin />
            </Button>
            <Button
              onClick={async () => {
                await signIn("google", { redirectTo: "/" });
              }}
              variant="outline"
              className="w-full"
            >
              <FcGoogle />
            </Button>
          </div>
        </Form>
        <Button className="mt-4 w-full" variant="outline" asChild>
          <Link href="/sign/register">Dont have an account? Signup </Link>
        </Button>
      </Card>
    </div>
  );
}
