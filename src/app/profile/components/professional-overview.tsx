"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { ProfileSchema } from "../../../schema/index";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ProfileUpdate } from "../../../actions/profile";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { FormError } from "../../../components/form-error";
import { FormSuccess } from "../../../components/form-success";
import Image from "next/image";
import { type ExtendedUser } from "~/next-auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "~/hooks/use-toast";

export function ProfessionalOverview({ user }: { user: ExtendedUser }) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  // const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      jobTitle: user.jobTitle ?? undefined,
      jobRoleFamily: user.jobRoleFamily ?? undefined,
      employmentStatus: user.employmentStatus ?? undefined,
      workMode: user.workMode || undefined,
      availability: user.availability || undefined,
      currentCompany: user.currentCompany || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      ProfileUpdate(values)
        .then(async (data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            await update();
            toast({
              title: "Profile updated!",
            });
            setEdit(false);
          }
        })
        .catch(() =>
          toast({
            title: "Oh no something went wrong!",
            description: "There was a problem with your request.",
            variant: "destructive",
          }),
        );
    });
  };

  return (
    <Card className="h-fit w-full" title="Personal Information">
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Professional Overview</h2>
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        <p className="w-full">{user.jobTitle ?? "N/A"}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobRoleFamily"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Job role family</FormLabel>
                    {edit ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem
                            value="SoftwareDevelopment"
                            className="cursor-pointer"
                          >
                            Software Development
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Data">
                            Data
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="Fintech"
                          >
                            Fintech
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="SalesMarketing"
                          >
                            Sales / Marketing
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="ProductManagment"
                          >
                            Product Managment
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="ScrumMaster"
                          >
                            Scrum Master
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Design">
                            Design
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="w-full">{user.jobRoleFamily ?? "N/A"}</p>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employmentStatus"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Employment Status</FormLabel>
                    {edit ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem
                            value="Freelance"
                            className="cursor-pointer"
                          >
                            Freelance
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="FullTime"
                          >
                            FullTime
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="PartTime"
                          >
                            PartTime
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="OpenToOpportunities"
                          >
                            OpenToOpportunities
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="w-full">{user.employmentStatus ?? "N/A"}</p>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workMode"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Work Mode</FormLabel>
                    {edit ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem value="Hybrid" className="cursor-pointer">
                            Hybrid
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Remote">
                            Remote
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Onsite">
                            Onsite
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="w-full">{user.workMode ?? "N/A"}</p>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Availability</FormLabel>
                    {edit ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem
                            value="OneMonth"
                            className="cursor-pointer"
                          >
                            1 Month
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="ThreeMonths"
                          >
                            3 Months
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="SixMonths"
                          >
                            6 Months
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="w-full">{user.availability ?? "N/A"}</p>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentCompany"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Current Company</FormLabel>
                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          placeholder="Current Company"
                          disabled={isPending}
                        />
                      ) : (
                        <p className="w-full">{user.currentCompany ?? "N/A"}</p>
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
    </Card>
  );
}
