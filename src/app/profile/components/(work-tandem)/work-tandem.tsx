"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { WorkTandemSchema } from "../../../../schema/index";
import { CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { WorkTandemCreate } from "../../../../actions/profile";
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
const availableRoles =
  WorkTandemSchema.shape.idealPartnerRole._def.type._def.values;

export function WorkTandem({ userId }: JobPreferenceProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof WorkTandemSchema>>({
    resolver: zodResolver(WorkTandemSchema),
  });

  const onSubmit = (values: z.infer<typeof WorkTandemSchema>) => {
    startTransition(() => {
      WorkTandemCreate(values)
        .then(async (data) => {
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
              name="idealPartnerRole"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="w-full">
                      Ideal Tandem Partner
                    </FormLabel>

                    <Select
                      onValueChange={(newRole) => {
                        const current = Array.isArray(field.value)
                          ? field.value
                          : [];

                        field.onChange([...current, newRole]);
                      }}
                    >
                      <FormControl className="cursor-pointer">
                        <SelectTrigger>
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="cursor-pointer">
                        {availableRoles.map((role, index) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={index}
                            value={role}
                          >
                            {replaceUnderscoreWithSpace(role)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complementarySkills"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="w-full">
                      Complementary Skills
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-none border-b-2 border-l-0 border-r-0 border-t-0"
                        placeholder="Add skills separated by commas"
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
                  </div>
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
