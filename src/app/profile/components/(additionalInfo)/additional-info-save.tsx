"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { AdditionalInfoSchema } from "../../../../schema/index";
import { CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { updateAdditionalInfo } from "../../../../actions/profile";
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
import { type AdditionalInfo } from "@prisma/client";
import { toast } from "~/hooks/use-toast";
import ButtonDeleteLanguage from "./delete-language";

type Language = {
  name: string;
  proficiency: "Mother Tongue" | "Fluent" | "Intermediate" | "Beginner";
};

type WorkTandemProps = {
  infos: AdditionalInfo | null;
  setEditAdditionalInfo: React.Dispatch<React.SetStateAction<boolean>>;
  editAdditionalInfo: boolean;
  userId: string;
};
const availableSchedule =
  AdditionalInfoSchema.shape.preferredWorkSchedule.options;

const proficiencyValues = [
  "Mother Tongue",
  "Fluent",
  "Intermediate",
  "Beginner",
];

export function AdditionalInfoSave({
  infos,
  editAdditionalInfo,
  setEditAdditionalInfo,
  userId,
}: WorkTandemProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AdditionalInfoSchema>>({
    resolver: zodResolver(AdditionalInfoSchema),
    defaultValues: {
      languages: Array.isArray(infos?.languages)
        ? (infos.languages as {
            name: string;
            proficiency:
              | "Mother Tongue"
              | "Fluent"
              | "Intermediate"
              | "Beginner";
          }[])
        : [],
      hobbiesAndInterests: infos?.hobbiesAndInterests ?? [],
      volunteering: infos?.volunteering ?? undefined,
      preferredWorkSchedule: infos?.preferredWorkSchedule as
        | "Flexible_Hours"
        | "Fixed_Hours"
        | "Full_Time"
        | "Part_Time"
        | "Job_Sharing"
        | undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof AdditionalInfoSchema>) => {
    startTransition(() => {
      updateAdditionalInfo(values, infos?.id ?? 0)
        .then(async (data) => {
          if (data.success) {
            await update();
            setSuccess(data.success);
            form.resetField("languages");
            form.resetField("preferredWorkSchedule");
            form.resetField("hobbiesAndInterests");
            setEditAdditionalInfo(false);
            toast({ title: "Additional info updated" });
          } else if (data.error) {
            setError(data.error);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const parsedLanguages: Language[] = Array.isArray(infos?.languages)
    ? (infos.languages as Language[])
    : [];

  return (
    <CardContent>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {editAdditionalInfo ? (
              <>
                <FormField
                  control={form.control}
                  name="hobbiesAndInterests"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="w-full">
                        Hobbies and Interests
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-none border-b-2 border-l-0 border-r-0 border-t-0"
                          placeholder="Add hobbies and interests separated by commas"
                          value={field.value ? field.value.join(", ") : ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value.split(",").map((item) => item.trim()),
                            );
                          }}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="flex flex-wrap items-center space-x-10">
                <FormLabel>Hobbies and Interests</FormLabel>
                {infos?.hobbiesAndInterests.length ? (
                  infos.hobbiesAndInterests.map((hobby, index) => (
                    <p key={index}>{hobby}</p>
                  ))
                ) : (
                  <p>No hobbies and interests</p>
                )}
              </div>
            )}

            {editAdditionalInfo ? (
              <FormField
                control={form.control}
                name="volunteering"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">
                      Volunteering experiences
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Volunteering experience"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex flex-wrap items-center space-x-10">
                <FormLabel>Volunteering experience</FormLabel>
                <p>{infos?.volunteering}</p>
              </div>
            )}

            {editAdditionalInfo ? (
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <>
                    {field.value.map((language, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <FormControl>
                          <Input
                            placeholder="Language"
                            value={language.name || ""}
                            onChange={(e) => {
                              const updatedLanguages = [...field.value];

                              updatedLanguages[index] = {
                                ...updatedLanguages[index],
                                name: e.target.value || "",
                                proficiency:
                                  updatedLanguages[index]?.proficiency ??
                                  "Beginner",
                              };

                              field.onChange(updatedLanguages);
                            }}
                          />
                        </FormControl>

                        <FormControl>
                          <Select
                            value={language.proficiency || "Beginner"}
                            onValueChange={(value) => {
                              const updatedLanguages = [...field.value];

                              updatedLanguages[index] = {
                                ...updatedLanguages[index],
                                name: updatedLanguages[index]?.name ?? "",
                                proficiency: value as
                                  | "Mother Tongue"
                                  | "Fluent"
                                  | "Intermediate"
                                  | "Beginner",
                              };

                              field.onChange(updatedLanguages);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select proficiency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mother Tongue">
                                Mother Tongue
                              </SelectItem>
                              <SelectItem value="Fluent">Fluent</SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <ButtonDeleteLanguage
                          userId={userId}
                          index={index}
                          setEditAdditionalInfo={setEditAdditionalInfo}
                        />
                      </div>
                    ))}

                    <Button
                      onClick={() => {
                        const updatedLanguages = [
                          ...field.value,
                          { name: "", proficiency: "Beginner" },
                        ];
                        field.onChange(updatedLanguages);
                      }}
                    >
                      Add Language
                    </Button>
                  </>
                )}
              />
            ) : (
              <div className="flex items-center space-x-10">
                <FormLabel>Languages</FormLabel>
                {parsedLanguages.map((language, index) => (
                  <p key={index}>
                    {language.name} - {language.proficiency}
                  </p>
                ))}
              </div>
            )}

            {editAdditionalInfo ? (
              <FormField
                control={form.control}
                name="preferredWorkSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Work Schedule</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSchedule.map((schedule) => (
                            <SelectItem key={schedule} value={schedule}>
                              {schedule}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex flex-wrap items-center space-x-10">
                <FormLabel>Preferred Work Schedule</FormLabel>
                <p>{infos?.preferredWorkSchedule}</p>
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
          {!editAdditionalInfo ? null : (
            <div className="flex space-x-4">
              <Button disabled={isPending} type="submit">
                Save
              </Button>
              <Button
                disabled={isPending}
                type="reset"
                onClick={() => {
                  setEditAdditionalInfo(false);
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
