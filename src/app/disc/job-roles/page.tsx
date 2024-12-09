"use client";

import Image from "next/image";
import Link from "next/link";
import * as RadioGroupRadix from "@radix-ui/react-radio-group";
import { ProfileSchema } from "~/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { ProfileUpdate } from "~/actions/profile";
import { toast } from "~/hooks/use-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Button } from "~/components/ui/button";
import { useCurrentUser } from "~/hooks/use-current-user";
import { useRouter } from "next/navigation";

const JobRoles = () => {
  const user = useCurrentUser();
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  // const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      ProfileUpdate(values)
        .then(async (data) => {
          // if (data?.error) {
          //   // setError(data.error);
          //   toast({ title: "Error", description: data.error });
          // }

          if (data.success) {
            await update();

            toast({
              title: "Job Role family updated",
              description: data.success,
            });
            router.push("/disc/job-roles/disc-test");
          }
        })
        .catch(() =>
          toast({
            title: "Error",
            description: "An error occurred",
            variant: "destructive",
          }),
        );
    });
  };

  return (
    <>
      {!user ? (
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
              Job roles
            </h1>
            <p className="w-2/4 text-center">
              Before taking the DISC test, please select the job role family
              that best matches your field of&nbsp;expertise. This will
              help&nbsp;us better match you with potential candidates for job
              sharing based on&nbsp;your professional background.
            </p>
          </section>
          <section className="px-24">
            <form id="role-form">
              <RadioGroupRadix.Root
                className="flex flex-col gap-4"
                defaultValue=""
                aria-label="Job role"
                onValueChange={(value) =>
                  localStorage.setItem("selectedRole", value)
                }
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroupRadix.Item
                    className="RadioGroupItem"
                    value="Software Development"
                    id="r1"
                  >
                    <RadioGroupRadix.Indicator className="RadioGroupIndicator" />
                  </RadioGroupRadix.Item>
                  <label className="ml-3" htmlFor="r1">
                    <strong>I. Software Development</strong> (Software
                    Development, Software Testing, DevOps, Full Stack
                    Development)
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroupRadix.Item
                    className="RadioGroupItem"
                    value="Data"
                    id="r2"
                  >
                    <RadioGroupRadix.Indicator className="RadioGroupIndicator" />
                  </RadioGroupRadix.Item>
                  <label className="ml-3" htmlFor="r2">
                    <strong>II. Data</strong> (Data Science, Data Engineering,
                    Machine Learning, Artificial Intelligence)
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroupRadix.Item
                    className="RadioGroupItem"
                    value="Fintech"
                    id="r3"
                  >
                    <RadioGroupRadix.Indicator className="RadioGroupIndicator" />
                  </RadioGroupRadix.Item>
                  <label className="ml-3" htmlFor="r3">
                    <strong>III. Fintech</strong> (Fintech, Blockchain)
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroupRadix.Item
                    className="RadioGroupItem"
                    value="Design"
                    id="r4"
                  >
                    <RadioGroupRadix.Indicator className="RadioGroupIndicator" />
                  </RadioGroupRadix.Item>
                  <label className="ml-3" htmlFor="r4">
                    <strong>IV. Design</strong> (Design, UI/UX)
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroupRadix.Item
                    className="RadioGroupItem"
                    value="Sales & Marketing"
                    id="r5"
                  >
                    <RadioGroupRadix.Indicator className="RadioGroupIndicator" />
                  </RadioGroupRadix.Item>
                  <label className="ml-3" htmlFor="r5">
                    <strong>V. Sales & Marketing</strong>
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroupRadix.Item
                    className="RadioGroupItem"
                    value="Product Management / Product Leadership"
                    id="r6"
                  >
                    <RadioGroupRadix.Indicator className="RadioGroupIndicator" />
                  </RadioGroupRadix.Item>
                  <label className="ml-3" htmlFor="r6">
                    <strong>VI. Product Management / Product Leadership</strong>
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RadioGroupRadix.Item
                    className="RadioGroupItem"
                    value="Scrum Master / Team Coach / Team Lead"
                    id="r7"
                  >
                    <RadioGroupRadix.Indicator className="RadioGroupIndicator" />
                  </RadioGroupRadix.Item>
                  <label className="ml-3" htmlFor="r7">
                    <strong>VII. Scrum Master / Team Coach / Team Lead</strong>
                  </label>
                </div>
              </RadioGroupRadix.Root>

              <div className="flex flex-col items-center">
                <p className="py-10">
                  Please choose the category that best fits your role, and click
                  &laquo;Next&raquo; to&nbsp;proceed to&nbsp;the DISC test.
                </p>
                <Link
                  href="/disc/job-roles/disc-test"
                  className="rounded-lg border border-alto bg-tree-poppy px-14 py-5 text-xl font-semibold hover:bg-flush-orange"
                  type="button"
                  // onClick={saveRole}
                >
                  Next
                </Link>
              </div>
            </form>
          </section>
        </main>
      ) : (
        <>
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
              Job roles
            </h1>
            <p className="w-2/4 text-center">
              Before taking the DISC test, please select the job role family
              that best matches your field of&nbsp;expertise. This will
              help&nbsp;us better match you with potential candidates for job
              sharing based on&nbsp;your professional background.
            </p>
          </section>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="jobRoleFamily"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SoftwareDevelopment" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <strong>I. Software Development</strong> (Software
                            Development, Software Testing, DevOps, Full Stack
                            Development)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Data" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <strong>II. Data</strong> (Data Science, Data
                            Engineering, Machine Learning, Artificial
                            Intelligence)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Fintech" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <strong>III. Fintech</strong> (Fintech, Blockchain)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Design" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <strong>IV. Design</strong> (Design, UI/UX)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SalesMarketing" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <strong>V. Sales & Marketing</strong>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ProductManagment" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <strong>
                              VI. Product Management / Product Leadership
                            </strong>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ScrumMaster" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <strong>
                              VII. Scrum Master / Team Coach / Team Lead
                            </strong>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-10 flex flex-col items-center justify-center gap-y-8">
                <p className="mt-8">
                  Please choose the category that best fits your role, and click
                  &laquo;Next&raquo; to&nbsp;proceed to&nbsp;the DISC test.
                </p>
                <Button
                  disabled={isPending}
                  className="mb-8 rounded-lg border text-violet border-alto bg-tree-poppy px-14 py-5 text-xl font-semibold hover:bg-flush-orange"
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  );
};

export default JobRoles;
