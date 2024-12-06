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
                    onValueChange={(selectedRole) => {
                      const updatedRoles = Array.isArray(field.value)
                        ? [...new Set([...field.value, selectedRole])]
                        : [selectedRole];
                      field.onChange(updatedRoles);
                    }}
                    value={
                      Array.isArray(field.value)
                        ? field.value.join(", ")
                        : field.value
                    }
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
                          {role}
                        </SelectItem>
                      ))}
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
                    onValueChange={(selecteWorkPreference) => {
                      
                      const updatedWorkPreference = Array.isArray(field.value)
                        ? [...new Set([...field.value, selecteWorkPreference])]
                        : [selecteWorkPreference];
                      field.onChange(updatedWorkPreference); 
                    }}
                    value={
                      Array.isArray(field.value)
                        ? field.value.join(", ")
                        : field.value
                    }
                  >
                    <FormControl className="cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer">
                      {availableWorkPreference.map((role, index) => (
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
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="w-full">Desired Industry</FormLabel>

                  <Select
                    onValueChange={(selectedIndustry) => {
                      
                      const updatedIndustry = Array.isArray(field.value)
                        ? [...new Set([...field.value, selectedIndustry])] 
                        : [selectedIndustry];
                      field.onChange(updatedIndustry); 
                    }}
                    value={
                      Array.isArray(field.value)
                        ? field.value.join(", ")
                        : field.value
                    }
                  >
                    <FormControl className="cursor-pointer">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer">
                      {availableIndustry.map((role, index) => (
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
