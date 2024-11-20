"use client";
import { type ExtendedUser } from "~/next-auth";

import { useState, useTransition } from "react";
import { Button } from "../../../../components/ui/button";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "~/schema";
import { ProfileUpdate } from "~/actions/profile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";

import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { Textarea } from "~/components/ui/textarea";

export default function Bio({
  user,
  editProfile,
  setEditProfile,
}: {
  user: ExtendedUser;
  editProfile: boolean;
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [error, setError] = useState<string | undefined>();
  // const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      bio: user.bio,
    },
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      ProfileUpdate(values)
        .then(async (data) => {
          // if (data?.error) {
          //   // setError(data.error);
          //   toast({ title: "Error", description: data.error });
          // }

          if (data.success) {
            await update();

            toast({
              title: "Short bio updated",
              description: data.success,
            });
            setEditProfile(false);
          }
        })
        .catch(() =>
          toast({
            title: "Error",
            description: "An error occurred",
            variant: "destructive",
          }),
        );
    });
  };
  if (!user.bio) return null;
  return (
    <>
      {editProfile ? (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col"
            >
              <div>
                <h3 className="w-full max-w-full text-2xl text-purple-900">
                  Short Bio:
                </h3>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="w-full max-w-full"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
              <div className="mt-4 flex space-x-4">
                <Button disabled={isPending} type="submit">
                  Save
                </Button>
                <Button onClick={() => setEditProfile(false)} type="reset">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <>
          <h3 className="text-2xl text-purple-900">Short Bio:</h3>
          <p className="break-words text-xl text-slate-700">{user.bio}</p>
        </>
      )}
    </>
  );
}
