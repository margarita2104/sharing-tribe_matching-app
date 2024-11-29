"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { z } from "zod";

import { settings } from "~/actions/settings";
import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { useCurrentUser } from "~/hooks/use-current-user";
import { SettingsSchema } from "~/schema";
import { DeleteProfileModal } from "./components/delete-profile-modal";

const SettingsPage = () => {
  const user = useCurrentUser();
  console.log(user);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      marketingEmails: user?.marketingEmails ?? false,
      profileVisibility: user?.profileVisibility ?? true,
      receiveMarketingEmails: user?.receiveMarketingEmails ?? false,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    console.log(values);
    startTransition(() => {
      settings(values)
        .then(async (data) => {
          console.log(data);
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            await update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  if (!user) return null;

  return (
    <div className="mt-8">
      <div className="grid w-9/12 grid-cols-1 items-center md:grid-cols-2 md:space-x-16">
        {user.image ? (
          <Image
            src={user.image}
            alt="Profile picture"
            width={100}
            height={100}
            className="h-24 w-24 justify-self-center rounded-full object-cover md:justify-self-end"
          />
        ) : (
          <RxAvatar className="h-24 w-24 justify-self-center rounded-full object-cover md:justify-self-end" />
        )}

        <div className="relative mt-6 space-y-1 md:justify-self-start">
          <p className="text-2xl text-violet">{user.name}</p>
          {user.discTestResult ? (
            <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-tree-poppy px-2 py-1 text-purple-800">
              <p>{user.discTestResult}</p>
            </div>
          ) : null}

          <p>{user.email}</p>
        </div>
      </div>
      <h2 className="mt-8 text-center text-2xl text-purple-900">Settings</h2>
      <div>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <h2 className="text-md text-purple-800">Profile Visibility</h2>
              <FormField
                control={form.control}
                name="profileVisibility"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg p-3">
                    <FormLabel className="w-full">
                      Your profile is visible on the candidates page
                    </FormLabel>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg p-3">
                    <FormLabel className="w-full">
                      Other candidates can reach you via email
                    </FormLabel>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <>
                <h2 className="text-md text-purple-800">Change Password</h2>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h2 className="text-md text-purple-800">Newsletter</h2>
                <FormField
                  control={form.control}
                  name="receiveMarketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg p-3">
                      <FormLabel className="w-full">
                        Receive marketing emails
                      </FormLabel>

                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <h2 className="text-md text-purple-800">Delete Profile</h2>
                <DeleteProfileModal />
              </>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingsPage;
