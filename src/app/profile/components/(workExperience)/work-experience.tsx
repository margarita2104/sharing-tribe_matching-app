"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { WorkExperienceSchema } from "../../../../schema/index";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { WorkUpdate } from "../../../../actions/profile";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "~/lib/utils";
import { format, isValid } from "date-fns";
import { toast } from "~/hooks/use-toast";
import { ModalWorkExpButton } from "./modal-work-exp";

type WorkExperienceProps = {
  workExperience: {
    id: number;
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string | null;
    userId: string;
  };
};

export function WorkExperiences({ workExperience }: WorkExperienceProps) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof WorkExperienceSchema>>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      jobTitle: workExperience.jobTitle,
      companyName: workExperience.companyName,
      startDate: workExperience.startDate,
      endDate: workExperience.endDate ?? "",
    },
  });
  const onSubmit = (values: z.infer<typeof WorkExperienceSchema>) => {
    startTransition(() => {
      WorkUpdate(values, workExperience.id)
        .then(async (data) => {
          // if (data?.error) {
          //   // setError(data.error);
          //   toast({ title: "Error", description: data.error });
          // }

          if (data?.success) {
            await update();
            // setSuccess(data.success);
            toast({
              title: "Work Experience updated",
              description: data.success,
            });
            setEdit(false);
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
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Work Experience</h2>
          {edit ? null : (
            <div className="cursor-pointer" onClick={() => setEdit(true)}>
              <Image
                src="/icons/profile-edit.png"
                alt="Profile edit icon"
                width={16}
                height={16}
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="workExperienceForm" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Job Title</FormLabel>

                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          placeholder="Job title"
                          disabled={isPending}
                        />
                      ) : (
                        <p className="w-full">{workExperience.jobTitle}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Company Name</FormLabel>
                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          placeholder="Company Name"
                          disabled={isPending}
                        />
                      ) : (
                        <p className="w-full">
                          {workExperience.companyName ?? "N/A"}
                        </p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                defaultValue={workExperience.userId}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormControl>
                      <Input {...field} disabled={isPending} type="hidden" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Start Date</FormLabel>
                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          onSelect={field.onChange}
                          placeholder="startDate"
                          disabled={isPending}
                          type="date"
                          value={
                            field.value
                              ? format(new Date(field.value), "yyyy-MM-dd")
                              : ""
                          }
                        />
                      ) : (
                        <p className="w-full">{workExperience.startDate}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">End Date</FormLabel>
                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          onSelect={field.onChange}
                          placeholder="startDate"
                          disabled={isPending}
                          type="date"
                          value={
                            field.value
                              ? format(new Date(field.value), "yyyy-MM-dd")
                              : ""
                          }
                        />
                      ) : (
                        <p className="w-full">{workExperience.endDate}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
            {edit ? (
              <div className="mt-4 space-x-2">
                {" "}
                <Button disabled={isPending} type="submit">
                  Save
                </Button>
                <Button
                  disabled={isPending}
                  onClick={() => setEdit(false)}
                  type="reset"
                >
                  Cancel
                </Button>
              </div>
            ) : null}
          </form>
        </Form>
      </CardContent>
    </>
  );
}
