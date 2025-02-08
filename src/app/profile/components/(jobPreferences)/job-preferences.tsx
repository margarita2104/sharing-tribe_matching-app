"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { JobPreferenceSchema } from "../../../../schema/index";
import { CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { JobPreferenceCreate } from "../../../../actions/profile";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { FormError } from "../../../../components/form-error";
import { FormSuccess } from "../../../../components/form-success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { replaceUnderscoreWithSpace } from "~/lib/utils";

type JobPreferenceProps = {
  userId: string;
};
const availableRoles = JobPreferenceSchema.shape.role._def.type._def.values;
const availableIndustry =
  JobPreferenceSchema.shape.industry._def.type._def.values;
const availableWorkPreference =
  JobPreferenceSchema.shape.workPreference._def.type._def.values;

export function JobPreferences({ userId }: JobPreferenceProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof JobPreferenceSchema>>({
    resolver: zodResolver(JobPreferenceSchema),
  });

  const onSubmit = (values: z.infer<typeof JobPreferenceSchema>) => {
    startTransition(() => {
      JobPreferenceCreate(values)
        .then(async (data) => {
          // if (data.error) {
          //   setError(data.error);
          // }

          if (data.success) {
            await update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <CardContent>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="w-full">Desired Roles</FormLabel>

                  <Select
                    onValueChange={(newRole) => {
                      const current = Array.isArray(field.value)
                        ? field.value
                        : [];
                      // Append the newly selected value
                      field.onChange([...current, newRole]);
                    }}
                  >
                    <FormControl className="cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer">
                      <SelectItem
                        value="Frontend_Developer"
                        className="cursor-pointer"
                      >
                        Frontend Developer
                      </SelectItem>
                      <SelectItem
                        value="Backend_Developer"
                        className="cursor-pointer"
                      >
                        Backend Developer
                      </SelectItem>
                      <SelectItem
                        value="Fullstack_Developer"
                        className="cursor-pointer"
                      >
                        Fullstack Developer
                      </SelectItem>
                      <SelectItem
                        value="Mobile_Developer"
                        className="cursor-pointer"
                      >
                        Mobile Developer
                      </SelectItem>
                      <SelectItem value="Designer" className="cursor-pointer">
                        Designer
                      </SelectItem>
                      <SelectItem
                        value="Product_Manager"
                        className="cursor-pointer"
                      >
                        Product Manager
                      </SelectItem>
                      <SelectItem
                        value="Data_Scientist"
                        className="cursor-pointer"
                      >
                        Data Scientist
                      </SelectItem>
                      <SelectItem
                        value="DevOps_Engineer"
                        className="cursor-pointer"
                      >
                        DevOps Engineer
                      </SelectItem>
                      <SelectItem
                        value="QA_Engineer"
                        className="cursor-pointer"
                      >
                        QA Engineer
                      </SelectItem>
                      <SelectItem
                        value="Software_Engineer"
                        className="cursor-pointer"
                      >
                        Software Engineer
                      </SelectItem>
                      <SelectItem value="Other" className="cursor-pointer">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workPreference"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="w-full">Work Preference</FormLabel>

                  <Select
                    onValueChange={(newRole) => {
                      const current = Array.isArray(field.value)
                        ? field.value
                        : [];
                      // Append the newly selected value
                      field.onChange([...current, newRole]);
                    }}
                  >
                    <FormControl className="cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer">
                      <SelectItem value="Full_Time" className="cursor-pointer">
                        Full Time
                      </SelectItem>
                      <SelectItem value="Part_Time" className="cursor-pointer">
                        Part Time
                      </SelectItem>
                      <SelectItem
                        value="Job_Sharing"
                        className="cursor-pointer"
                      >
                        Job Sharing
                      </SelectItem>
                      <SelectItem value="Hybrid" className="cursor-pointer">
                        Hybrid
                      </SelectItem>
                      <SelectItem value="Remote" className="cursor-pointer">
                        Remote
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="w-full">Desired Industry</FormLabel>

                  <Select
                    onValueChange={(newRole) => {
                      const current = Array.isArray(field.value)
                        ? field.value
                        : [];
                      // Append the newly selected value
                      field.onChange([...current, newRole]);
                    }}
                  >
                    <FormControl className="cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer">
                      <SelectItem value="IT" className="cursor-pointer">
                        IT
                      </SelectItem>
                      <SelectItem value="Media" className="cursor-pointer">
                        Media
                      </SelectItem>
                      <SelectItem value="Education" className="cursor-pointer">
                        Education
                      </SelectItem>
                      <SelectItem value="Finance" className="cursor-pointer">
                        Finance
                      </SelectItem>
                      <SelectItem value="Retail" className="cursor-pointer">
                        Retail
                      </SelectItem>
                      <SelectItem value="Other" className="cursor-pointer">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              defaultValue={userId}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormControl>
                    <Input {...field} disabled={isPending} type="hidden" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit">
            Add
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}
