"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { EducationSchema } from "../../../../schema/index";
import { CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { EducationUpdate } from "../../../../actions/profile";
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

type EducationProps = {
  educatio: {
    id: number;
    degree: string;
    fieldOfStudy: string;
    institution: string;
    graduationYear: string | null;
    userId: string;
  };
};

export function EducationCertification({ educatio }: EducationProps) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EducationSchema>>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      degree: educatio.degree,
      fieldOfStudy: educatio.fieldOfStudy,
      institution: educatio.institution,
      graduationYear: educatio.graduationYear ?? undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof EducationSchema>) => {
    startTransition(() => {
      EducationUpdate(values, educatio.id)
        .then(async (data) => {
          // if (data?.error) {
          //   // setError(data.error);
          //   toast({ title: "Error", description: data.error });
          // }

          if (data?.success) {
            await update();
            // setSuccess(data.success);
            toast({
              title: "Education updated",
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
          <h2 className="text-lg text-violet">Education & Certifications</h2>
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
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Degree</FormLabel>

                      <FormControl>
                        {edit ? (
                          <Input
                            {...field}
                            placeholder="Degree"
                            disabled={isPending}
                          />
                        ) : (
                          <p className="w-full">{educatio.degree}</p>
                        )}
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fieldOfStudy"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Field Of Study</FormLabel>
                      <FormControl>
                        {edit ? (
                          <Input
                            {...field}
                            placeholder="Field Of Study"
                            disabled={isPending}
                          />
                        ) : (
                          <p className="w-full">
                            {educatio.fieldOfStudy ?? "N/A"}
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
                defaultValue={educatio.userId}
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
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Institution</FormLabel>
                      <FormControl>
                        {edit ? (
                          <Input
                            {...field}
                            placeholder="institution"
                            disabled={isPending}
                          />
                        ) : (
                          <p className="w-full">
                            {educatio.institution ?? "N/A"}
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
                name="graduationYear"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Graduation Year</FormLabel>
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
                            {educatio.graduationYear ?? "N/A"}
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
              </div>
            ) : null}
          </form>
        </Form>
      </CardContent>
    </>
  );
}
