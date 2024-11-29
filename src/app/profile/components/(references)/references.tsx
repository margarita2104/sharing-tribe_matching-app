"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { ReferencesSchema } from "../../../../schema/index";
import { CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { referenceUpdate } from "../../../../actions/profile";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import Image from "next/image";
import { toast } from "~/hooks/use-toast";
import { DeleteModal } from "./modal-delete";

type ReferenceProp = {
  reference: {
    id: number;
    name: string;
    relationship: string;
    company: string;
    contactInfo: string;
    userId: string;
  };
};

export function ReferenceComponent({ reference }: ReferenceProp) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ReferencesSchema>>({
    resolver: zodResolver(ReferencesSchema),
    defaultValues: {
      name: reference.name,
      relationship: reference.relationship,
      company: reference.company,
      contactInfo: reference.contactInfo,
    },
  });
  const onSubmit = (values: z.infer<typeof ReferencesSchema>) => {
    startTransition(() => {
      referenceUpdate(values, reference.id)
        .then(async (data) => {
          // if (data?.error) {
          //   // setError(data.error);
          //   toast({ title: "Error", description: data.error });
          // }

          if (data?.success) {
            await update();
            // setSuccess(data.success);
            toast({
              title: "Reference updated",
              description: data.success,
            });
            setEdit(false);
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

  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">References</h2>
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
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Reference Name</FormLabel>

                      <FormControl>
                        {edit ? (
                          <Input
                            {...field}
                            placeholder="Reference Name"
                            disabled={isPending}
                          />
                        ) : (
                          <p className="w-full">{reference.name}</p>
                        )}
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">
                        Relationship to Candidate
                      </FormLabel>
                      <FormControl>
                        {edit ? (
                          <Input
                            {...field}
                            placeholder="Relationship to Candidate"
                            disabled={isPending}
                          />
                        ) : (
                          <p className="w-full">
                            {reference.relationship ?? "N/A"}
                          </p>
                        )}
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                defaultValue={reference.userId}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormControl>
                      <Input {...field} disabled={isPending} type="hidden" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">
                        Company/Organization
                      </FormLabel>
                      <FormControl>
                        {edit ? (
                          <Input
                            {...field}
                            placeholder="Company/Organization"
                            disabled={isPending}
                          />
                        ) : (
                          <p className="w-full">{reference.company ?? "N/A"}</p>
                        )}
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">
                        Contact Information
                      </FormLabel>
                      <FormControl>
                        {edit ? (
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            placeholder="Graduation Year"
                            disabled={isPending}
                          />
                        ) : (
                          <p className="w-full">
                            {reference.contactInfo ?? "N/A"}
                          </p>
                        )}
                      </FormControl>
                    </div>
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
                <DeleteModal
                  id={reference.id}
                  name="reference"
                  isPending={isPending}
                />
              </div>
            ) : null}
          </form>
        </Form>
      </CardContent>
    </>
  );
}
