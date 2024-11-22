"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { AdditionalInfoSchema } from "../../../../schema/index";
import { CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { AdditionalInfoCreate } from "../../../../actions/profile";
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

type AdditionalInfoProps = {
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

export function AdditionalInfoComponent({ userId }: AdditionalInfoProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AdditionalInfoSchema>>({
    resolver: zodResolver(AdditionalInfoSchema),
    defaultValues: {
      languages: [{ name: "", proficiency: "Beginner" }], // Default values
    },
  });

  const onSubmit = (values: z.infer<typeof AdditionalInfoSchema>) => {
    console.log("Form submitted with values:", values); // Debug
    startTransition(() => {
      AdditionalInfoCreate(values)
        .then(async (data) => {
          console.log("Server response:", data); // Debug
          await update();
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

            <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <>
                  {field.value.map((language, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      {/* Input for Language Name */}

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

                      {/* Dropdown for Proficiency */}
                      <FormControl>
                        <Select
                          value={language.proficiency || "Beginner"} // Default to "Beginner" if undefined
                          onValueChange={(value) => {
                            const updatedLanguages = [...field.value];

                            // Ensure both `name` and `proficiency` are defined
                            updatedLanguages[index] = {
                              ...updatedLanguages[index],
                              name: updatedLanguages[index]?.name ?? "", // Default to an empty string if undefined
                              proficiency: value as
                                | "Mother Tongue"
                                | "Fluent"
                                | "Intermediate"
                                | "Beginner", // Assign proficiency
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
                    </div>
                  ))}
                </>
              )}
            />

            <FormField
              control={form.control}
              name="preferredWorkSchedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Work Schedule</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange} // Hook Form handles the value change
                      defaultValue={field.value} // Default value from the form state
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
