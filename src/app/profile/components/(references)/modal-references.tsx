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
import { ReferencesSchema } from "~/schema";
import { referenceCreate } from "~/actions/profile";
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

export function ModalReferences({
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

  const form = useForm<z.infer<typeof ReferencesSchema>>({
    resolver: zodResolver(ReferencesSchema),
  });

  const onSubmit = (values: z.infer<typeof ReferencesSchema>) => {
    startTransition(() => {
      referenceCreate(values)
        .then(async (data) => {
          // if (data?.error) {
          //   // setError(data.error);
          //   toast({ title: "Error", description: data.error });
          // }

          if (data.success) {
            await update();

            toast({
              title: "Reference added",
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
                name="name"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">Reference Name</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Reference Name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">
                      Relationship to Candidate
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Relationship to Candidate"
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
                name="company"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">
                      Company/Organization
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Company/Organization"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-full">
                      Contact Information
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Contact Information"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <FormError message={error} />
            <FormSuccess message={success} /> */}

            <DialogFooter className="mt-8">
              {" "}
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending} type="reset">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button disabled={isPending} type="submit">
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
