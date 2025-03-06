"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { SoftSKilsSchema } from "../../../../schema/index";
import { CardContent } from "../../../../components/ui/card";
import { SoftSkillCreate, TechSkillCreate } from "../../../../actions/profile";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import type { SoftSkills } from "~/next-auth";
import SoftSkillText from "./soft-skill-text";

type SoftSkillsProp = {
  softSkills: SoftSkills[];
  userId: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
};

export function SoftSkillsMain({
  softSkills,
  userId,
  setEdit,
  edit,
}: SoftSkillsProp) {
  const [error, setError] = useState<string | undefined>();
  // const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SoftSKilsSchema>>({
    resolver: zodResolver(SoftSKilsSchema),
  });
  const onSubmit = (values: z.infer<typeof SoftSKilsSchema>) => {
    startTransition(() => {
      SoftSkillCreate(values)
        .then(async (data) => {
          // if (data?.error) {
          //   // setError(data.error);
          //   toast({ title: "Error", description: data.error });
          // }

          if (data?.success) {
            await update();
            // setSuccess(data.success);
            toast({
              title: "Skill added",
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
      <div className="ml-5 flex flex-wrap items-center gap-2">
        {softSkills.map((skill, index) => (
          <SoftSkillText key={index} skill={skill} edit={edit} />
        ))}
      </div>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormControl>
                      {edit ? (
                        <Input
                          className="rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-b-violet shadow-none"
                          {...field}
                          placeholder="Start typing to add a skill"
                          disabled={isPending}
                        />
                      ) : null}
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
            {edit && (
              // <div className="mt-4 space-x-2">
              //   <Button
              //     form="technicalSkillsForm"
              //     disabled={isPending}
              //     type="submit"
              //   >
              //     Save
              //   </Button>
              <Button
                disabled={isPending}
                onClick={() => setEdit(false)}
                type="reset"
                className="mt-4"
              >
                Cancel
              </Button>
              // </div>
            )}
          </form>
        </Form>
      </CardContent>
    </>
  );
}
