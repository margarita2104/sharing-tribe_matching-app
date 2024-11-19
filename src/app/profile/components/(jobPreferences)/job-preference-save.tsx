"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { JobPreferenceSchema } from "../../../../schema/index";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
  JobPreferenceDelete,
  JobPreferenceUpdate,
} from "../../../../actions/profile";
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
import { type JobPreference } from "@prisma/client";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "~/hooks/use-toast";

type JobPreferenceProps = {
  jobPreferences: JobPreference | null;
  setEditJobPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  editJobPreferences: boolean;
  userId: string;
};
const availableRoles = JobPreferenceSchema.shape.role._def.type._def.values;
const availableIndustry =
  JobPreferenceSchema.shape.industry._def.type._def.values;
const availableWorkPreference =
  JobPreferenceSchema.shape.workPreference._def.type._def.values;

export function JobPreferencesSave({
  jobPreferences,
  editJobPreferences,
  setEditJobPreferences,
  userId,
}: JobPreferenceProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof JobPreferenceSchema>>({
    resolver: zodResolver(JobPreferenceSchema),
    defaultValues: {
      role: [],
      workPreference: [],
      industry: [],
      userId: userId,
    },
  });

  const onSubmit = (values: z.infer<typeof JobPreferenceSchema>) => {
    startTransition(() => {
      JobPreferenceUpdate(values, jobPreferences?.id ?? 0)
        .then(async (data) => {
          // if (data.error) {
          //   setError(data.error);
          // }

          if (data.success) {
            await update();
            setSuccess(data.success);
            form.resetField("role");
            form.resetField("industry");
            form.resetField("workPreference");
            setEditJobPreferences(false);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  const filteredWorkPreferences =
    jobPreferences &&
    availableWorkPreference.filter(
      (preference) => !jobPreferences.workPreference.includes(preference),
    );
  const filteredRole =
    jobPreferences &&
    availableRoles.filter(
      (preference) => !jobPreferences.role.includes(preference),
    );
  const filteredIndustry =
    jobPreferences &&
    availableIndustry.filter(
      (preference) => !jobPreferences.industry.includes(preference),
    );

  return (
    <CardContent>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {editJobPreferences ? (
              <>
                <div className="flex flex-wrap items-center justify-start space-x-4 space-y-1">
                  {jobPreferences?.role.map((role, index) => (
                    <>
                      <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                        {role}
                        {editJobPreferences && (
                          <div
                            onClick={() =>
                              startTransition(async () => {
                                await JobPreferenceDelete(
                                  jobPreferences?.id ?? 0,
                                  "role",
                                  index,
                                )
                                  .then(() => {
                                    toast({
                                      title: "Skill deleted",
                                      description: "Skill has been deleted",
                                    });
                                  })
                                  .catch((error) => {
                                    toast({
                                      title: "Error",
                                      description: `Failed to delete skill`,
                                    });
                                  });
                              })
                            }
                            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
                          >
                            <MdOutlineCancel className="text-red-500" />
                          </div>
                        )}
                      </span>
                    </>
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-full">
                        Desired Role (Add a new one){" "}
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          // Ensure the value is wrapped in an array
                          field.onChange([value]);
                        }}
                        value={field.value?.[0] ?? ""} // Use the first value in the array or an empty string
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          {filteredRole?.map((role, index) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={index}
                              value={role}
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="flex flex-wrap items-center space-x-4 space-y-2">
                <FormLabel>Desired Roles</FormLabel>
                {jobPreferences?.role.map((role, index) => (
                  <>
                    <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                      {role}
                      {editJobPreferences && (
                        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer">
                          <MdOutlineCancel className="text-red-500" />
                        </div>
                      )}
                    </span>
                  </>
                ))}
              </div>
            )}

            {editJobPreferences ? (
              <>
                <div className="flex items-center space-x-4">
                  {jobPreferences?.workPreference.map((role, index) => (
                    <>
                      <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                        {role}
                        {editJobPreferences && (
                          <div
                            onClick={() =>
                              startTransition(async () => {
                                await JobPreferenceDelete(
                                  jobPreferences?.id ?? 0,
                                  "workPreference",
                                  index,
                                )
                                  .then(() => {
                                    toast({
                                      title: "Skill deleted",
                                      description: "Skill has been deleted",
                                    });
                                  })
                                  .catch((error) => {
                                    toast({
                                      title: "Error",
                                      description: `Failed to delete skill`,
                                    });
                                  });
                              })
                            }
                            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
                          >
                            <MdOutlineCancel className="text-red-500" />
                          </div>
                        )}
                      </span>
                    </>
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name="workPreference"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-full">
                        Work Preference (Add a new one){" "}
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          // Ensure the value is wrapped in an array
                          field.onChange([value]);
                        }}
                        value={field.value?.[0] ?? ""} // Use the first value in the array or an empty string
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          {filteredWorkPreferences?.map((role, index) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={index}
                              value={role}
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="flex flex-wrap items-center space-x-4 space-y-2">
                <FormLabel>Work Preference</FormLabel>
                {jobPreferences?.workPreference.map((role, index) => (
                  <>
                    <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                      {role}
                      {editJobPreferences && (
                        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer">
                          <MdOutlineCancel className="text-red-500" />
                        </div>
                      )}
                    </span>
                  </>
                ))}
              </div>
            )}

            {editJobPreferences ? (
              <>
                <div className="flex items-center space-x-4">
                  {jobPreferences?.industry.map((role, index) => (
                    <>
                      <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                        {role}
                        {editJobPreferences && (
                          <div
                            onClick={() =>
                              startTransition(async () => {
                                await JobPreferenceDelete(
                                  jobPreferences?.id ?? 0,
                                  "industry",
                                  index,
                                )
                                  .then(() => {
                                    toast({
                                      title: "Skill deleted",
                                      description: "Skill has been deleted",
                                    });
                                  })
                                  .catch((error) => {
                                    toast({
                                      title: "Error",
                                      description: `Failed to delete skill`,
                                    });
                                  });
                              })
                            }
                            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
                          >
                            <MdOutlineCancel className="text-red-500" />
                          </div>
                        )}
                      </span>
                    </>
                  ))}
                </div>
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="w-full">
                        Desired industry (Add a new one){" "}
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          // Ensure the value is wrapped in an array
                          field.onChange([value]);
                        }}
                        value={field.value?.[0] ?? ""} // Use the first value in the array or an empty string
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          {filteredIndustry?.map((role, index) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={index}
                              value={role}
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="flex flex-wrap items-center space-x-4 space-y-2">
                <FormLabel>Desired Industry</FormLabel>
                {jobPreferences?.industry.map((role, index) => (
                  <>
                    <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                      {role}
                      {editJobPreferences && (
                        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer">
                          <MdOutlineCancel className="text-red-500" />
                        </div>
                      )}
                    </span>
                  </>
                ))}
              </div>
            )}
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
          {/* <FormError message={error} />
          <FormSuccess message={success} /> */}
          {!editJobPreferences ? null : (
            <div className="flex space-x-4">
              <Button disabled={isPending} type="submit">
                Save
              </Button>
              <Button
                disabled={isPending}
                type="reset"
                onClick={() => {
                  form.resetField("role");
                  form.resetField("industry");
                  form.resetField("workPreference");

                  setEditJobPreferences(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </Form>
    </CardContent>
  );
}
