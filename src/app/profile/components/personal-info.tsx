"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ProfileSchema } from "../../../schema/index";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { fetchCities, ProfileUpdate } from "../../../actions/profile";
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
import type { ExtendedUser } from "~/next-auth";
import { toast } from "~/hooks/use-toast";
import Link from "next/link";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import debounce from "lodash.debounce";

export function PersonalInfo({ user }: { user: ExtendedUser }) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name ?? undefined,
      location: user.location || undefined,
      email: user.email ?? undefined,
      linkedinUrl: user.linkedinUrl || undefined,
    },
  });

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const cities = await fetchCities(query);
        setSuggestions(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    void debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [query]);

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      ProfileUpdate(values)
        .then(async (data) => {
          if (data?.error) {
            // setError(data.error);
            toast({ title: "Error", description: data.error });
          }

          if (data?.success) {
            await update();
            // setSuccess(data.success);
            toast({ title: "Profile updated", description: data.success });
            setEdit(false);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Card className="h-fit w-full" title="Personal Information">
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Personal Information</h2>
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
                name="name"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Full Name</FormLabel>

                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          placeholder="Full Name"
                          disabled={isPending || user.isOAuth}
                        />
                      ) : (
                        <p className="w-full">{user.name}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Location</FormLabel>
                    <FormControl className="w-full">
                      {edit ? (
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Enter city"
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              setQuery(e.target.value);
                            }}
                            disabled={isPending}
                          />
                          {loading && (
                            <LoadingSpinner className="mx-auto my-2 flex h-6 w-6 items-center justify-center p-2" />
                          )}
                          {suggestions.length > 0 && (
                            <ul className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-md">
                              {suggestions.map((city) => (
                                <li
                                  key={city}
                                  className="cursor-pointer p-2 text-sm hover:bg-gray-100"
                                  onClick={() => {
                                    field.onChange(city);
                                    setSuggestions([]);
                                  }}
                                >
                                  {city}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <p className="w-full">
                          {user.location ? user.location : "N/A"}
                        </p>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Email</FormLabel>
                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          placeholder="Email"
                          disabled={isPending || user.isOAuth}
                        />
                      ) : (
                        <p className="w-full">{user.email}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">
                      Social Media (Linkedin)
                    </FormLabel>
                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          placeholder="Linkedin URL"
                          disabled={isPending}
                        />
                      ) : user.linkedinUrl ? (
                        <Link
                          href={user.linkedinUrl}
                          target="_blank"
                          className="w-full underline"
                        >
                          {user.linkedinUrl ? "Linkedin" : "N/A"}
                        </Link>
                      ) : (
                        <p className="w-full">{user.linkedinUrl ?? "N/A"}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">
                      Social Media (Other links)
                    </FormLabel>
                    <FormControl>
                      {edit ? (
                        <Input
                          {...field}
                          placeholder="Github URL"
                          disabled={isPending}
                        />
                      ) : user.githubUrl ? (
                        <Link
                          href={user.githubUrl}
                          target="_blank"
                          className="w-full underline"
                        >
                          {user.githubUrl ? "Other Links" : "N/A"}
                        </Link>
                      ) : (
                        <p className="w-full">{user.githubUrl ?? "N/A"}</p>
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
