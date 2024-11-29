"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import {
  JobPreferenceSchema,
  WorkTandemSchema,
} from "../../../../schema/index";
import { CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
  WorkTandemDelete,
  WorkTandemUpdate,
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
import { type TandemPreference } from "@prisma/client";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "~/hooks/use-toast";

type WorkTandemProps = {
  workTandemPreferences: TandemPreference | null;
  setEditWorkTandem: React.Dispatch<React.SetStateAction<boolean>>;
  editWorkTandem: boolean;
  userId: string;
};
const availableRoles =
  WorkTandemSchema.shape.idealPartnerRole._def.type._def.values;

export function WorkTandemSave({
  workTandemPreferences,
  editWorkTandem,
  setEditWorkTandem,
  userId,
}: WorkTandemProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof WorkTandemSchema>>({
    resolver: zodResolver(WorkTandemSchema),
    defaultValues: {
      idealPartnerRole: [],
      // complementarySkills: [],
      userId: userId,
    },
  });

  const onSubmit = (values: z.infer<typeof WorkTandemSchema>) => {
    startTransition(() => {
      WorkTandemUpdate(values, workTandemPreferences?.id ?? 0)
        .then(async (data) => {
          // if (data.error) {
          //   setError(data.error);
          // }

          if (data.success) {
            await update();
            setSuccess(data.success);
            form.resetField("idealPartnerRole");
            form.resetField("complementarySkills");

            setEditWorkTandem(false);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const filteredRole =
    workTandemPreferences &&
    availableRoles.filter(
      (preference) =>
        !workTandemPreferences.idealPartnerRole.includes(preference),
    );

  return (
    <CardContent>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {editWorkTandem ? (
              <>
                <div className="flex flex-wrap items-center justify-start space-x-4 space-y-1">
                  {workTandemPreferences?.idealPartnerRole.map(
                    (role, index) => (
                      <>
                        <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                          {role}
                          {editWorkTandem && (
                            <div
                              onClick={() =>
                                startTransition(async () => {
                                  await WorkTandemDelete(
                                    workTandemPreferences?.id ?? 0,
                                    "idealPartnerRole",
                                    index,
                                  )
                                    .then(() => {
                                      toast({
                                        title: "Ideal role deleted",
                                        description:
                                          "Ideal role has been deleted",
                                      });
                                    })
                                    .catch((error) => {
                                      toast({
                                        title: "Error",
                                        description: `Failed to delete role`,
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
                    ),
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="idealPartnerRole"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="w-full">
                          Ideal Tandem Partner (Add a new one){" "}
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
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="flex flex-wrap items-center space-x-4 space-y-2">
                <FormLabel>Ideal Tandem Partner</FormLabel>
                {workTandemPreferences?.idealPartnerRole.map((role, index) => (
                  <>
                    <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                      {role}
                      {editWorkTandem && (
                        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer">
                          <MdOutlineCancel className="text-red-500" />
                        </div>
                      )}
                    </span>
                  </>
                ))}
              </div>
            )}

            {editWorkTandem ? (
              <>
                <div className="flex items-center space-x-4">
                  {workTandemPreferences?.complementarySkills.map(
                    (role, index) => (
                      <>
                        <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                          {role}
                          {editWorkTandem && (
                            <div
                              onClick={() =>
                                startTransition(async () => {
                                  await WorkTandemDelete(
                                    workTandemPreferences?.id ?? 0,
                                    "complementarySkills",
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
                    ),
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="complementarySkills"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="w-full">
                          Complementary Skills (Add a new one)
                        </FormLabel>
                        <FormControl>
                          {editWorkTandem ? (
                            <Input
                              className="rounded-none border-b-2 border-l-0 border-r-0 border-t-0"
                              placeholder="Add skills separated by commas"
                              value={field.value ? field.value.join(", ") : ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Convert comma-separated input into an array
                                field.onChange(
                                  value.split(",").map((item) => item.trim()),
                                );
                              }}
                              disabled={isPending}
                            />
                          ) : null}
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="flex flex-wrap items-center space-x-4 space-y-2">
                <FormLabel>Complementary Skills</FormLabel>
                {workTandemPreferences?.complementarySkills.map(
                  (role, index) => (
                    <>
                      <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
                        {role}
                        {editWorkTandem && (
                          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer">
                            <MdOutlineCancel className="text-red-500" />
                          </div>
                        )}
                      </span>
                    </>
                  ),
                )}
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
          {!editWorkTandem ? null : (
            <div className="flex space-x-4">
              <Button disabled={isPending} type="submit">
                Save
              </Button>
              <Button
                disabled={isPending}
                type="reset"
                onClick={() => {
                  form.resetField("idealPartnerRole");
                  form.resetField("complementarySkills");

                  setEditWorkTandem(false);
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
