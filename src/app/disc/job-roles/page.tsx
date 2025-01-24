"use client";

import Image from "next/image";
import { ProfileSchema } from "~/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
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
import { AspectRatio } from "~/components/ui/aspect-ratio";

const JobRoles = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      if (user) {
        ProfileUpdate(values)
          .then(async (data) => {
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
      } else if (values?.jobRoleFamily) {
        localStorage.setItem("selectedRole", values.jobRoleFamily);
        router.push("/disc/job-roles/disc-test");
      }
    });
  };

  return (
    <>
      <AspectRatio ratio={16 / 8} className="bg-muted">
        <Image
          src="/images/disc-about-page.svg"
          alt="Hero Image"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <section className="flex flex-col items-center">
        <h1 className="m-10 text-center text-2xl font-semibold text-violet md:text-4xl">
          Job roles
        </h1>
        <p className="text-center text-sm leading-7 md:w-3/4 md:text-base md:leading-9">
          Before taking the DISC test, please select the job role family that
          best matches your field of&nbsp;expertise. This will help&nbsp;us
          better match you with potential candidates for job sharing based
          on&nbsp;your professional background.
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
                      <FormLabel className="font-normal leading-5">
                        <strong>Software Development</strong> (Software
                        Development, Software Testing, DevOps, Full Stack
                        Development)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Data" />
                      </FormControl>
                      <FormLabel className="font-normal leading-5">
                        <strong>Data</strong> (Data Science, Data Engineering,
                        Machine Learning, Artificial Intelligence)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Fintech" />
                      </FormControl>
                      <FormLabel className="font-normal leading-5">
                        <strong>Fintech</strong> (Fintech, Blockchain)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Design" />
                      </FormControl>
                      <FormLabel className="font-normal leading-5">
                        <strong>Design</strong> (Design, UI/UX)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="SalesMarketing" />
                      </FormControl>
                      <FormLabel className="font-normal leading-5">
                        <strong>Sales & Marketing</strong>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ProductManagment" />
                      </FormControl>
                      <FormLabel className="font-normal leading-5">
                        <strong>Product Management / Product Leadership</strong>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ScrumMaster" />
                      </FormControl>
                      <FormLabel className="font-normal leading-5">
                        <strong>Scrum Master / Team Coach / Team Lead</strong>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Other" />
                      </FormControl>
                      <FormLabel className="font-normal leading-5">
                        <strong>Other</strong>
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
              className="mb-8 rounded-lg border border-alto bg-tree-poppy px-14 py-5 text-xl font-semibold text-violet hover:bg-flush-orange"
              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default JobRoles;
