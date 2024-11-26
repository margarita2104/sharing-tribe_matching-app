"use client";

import { useState, useTransition } from "react";
import { Button } from "../../../components/ui/button";

import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "~/schema";
import { ProfileUpdate, uploadImage } from "~/actions/profile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { type ExtendedUser } from "~/next-auth";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { RxAvatar } from "react-icons/rx";

export function ProfileHeader({
  user,
  editProfile,
  setEditProfile,
}: {
  user: ExtendedUser;
  editProfile: boolean;
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
  });
  console.log(user.image);

  const onSubmit = async (data: z.infer<typeof ProfileSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof FileList && value.length > 0) {
        if (value[0]) {
          formData.append(key, value[0]);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    let imageUrl = "";

    if (formData.get("image")) {
      const response = await uploadImage(formData);
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
        return;
      }
      imageUrl = response.imageUrl ?? "";
    }

    startTransition(() => {
      ProfileUpdate({ ...data, image: imageUrl })
        .then(async (response) => {
          if (response.success) {
            toast({
              title: "Profile Updated",
              description: "Your profile has been updated successfully!",
            });
            await update();
            setEditProfile(false);
          } else {
            toast({
              title: "Error",
              description: response.error ?? "An unknown error occurred.",
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          console.error("Error during profile update:", err);
          toast({
            title: "Error",
            description: "An error occurred while updating your profile.",
            variant: "destructive",
          });
        });
    });
  };
  return (
    <div className="mt-14 flex flex-col items-center justify-center">
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
          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-tree-poppy px-2 py-1 text-purple-800">
            <p>C</p>
          </div>
          <p>{user.email}</p>
          {editProfile && !user.bio ? null : (
            <Button
              className="w-full border-[1px] border-tree-poppy bg-white"
              variant="secondary"
              onClick={() => setEditProfile(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      {editProfile && !user.isOAuth ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-8">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full cursor-pointer">
                    <FormLabel>Change your picture</FormLabel>
                    <FormControl className="cursor-pointer">
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        className="w-full cursor-pointer"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 space-x-4">
              <Button
                className="border-[1px] border-tree-poppy bg-white"
                variant="secondary"
                type="submit"
                disabled={isPending}
              >
                Save
              </Button>
              <Button
                className="border-[1px] border-tree-poppy bg-white"
                variant="secondary"
                disabled={isPending}
                onClick={() => setEditProfile(false)}
              >
                Cancel
              </Button>
            </div>
            {/* <FormError message={error} />
                  <FormSuccess message={success} /> */}
          </form>
        </Form>
      ) : null}
    </div>
  );
}
