"use client";

import { useState, useTransition } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WorkExperienceSchema } from "~/schema";
import { WorkCreate } from "~/actions/profile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { cn } from "~/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";
import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";

export function ModalWorkExpButton({
  userId,
  title,
}: {
  userId: string;
  title: string;
}) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof WorkExperienceSchema>>({
    resolver: zodResolver(WorkExperienceSchema),
  });

  const onSubmit = (values: z.infer<typeof WorkExperienceSchema>) => {
    startTransition(() => {
      WorkCreate(values)
        .then(async (data) => {
          if (data?.error) {
            // setError(data.error);
            toast({ title: "Error", description: data.error });
          }

          if (data.success) {
            await update();

            toast({
              title: "Work Experience updated",
              description: data.success,
            });
            setEdit(false);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border-[1px] border-tree-poppy bg-white"
          variant="outline"
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Job Title</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Job title"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Company Name"
                        disabled={isPending}
                      />
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

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Start Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onSelect={field.onChange}
                        placeholder="startDate"
                        disabled={isPending}
                        type="date"
                        value={
                          field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">End Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onSelect={field.onChange}
                        placeholder="endDate"
                        disabled={isPending}
                        type="date"
                        value={
                          field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />

            <DialogFooter className="mt-8">
              {" "}
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending} type="reset">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  disabled={isPending}
                  onClick={() => setEdit(false)}
                  type="submit"
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
