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
import { ProfileSchema } from "~/schema";
import { ProfileUpdate } from "~/actions/profile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function ModalProfessionalOverview({ title }: { title: string }) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
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
            setOpen(false);

            toast({
              title: "Professional Overview added!",
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
    <Dialog open={open} onOpenChange={setOpen}>
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
          <form id="createEducationForm" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Job Title</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Job Title"
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobRoleFamily"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Job role family</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem
                            value="SoftwareDevelopment"
                            className="cursor-pointer"
                          >
                            Software Development
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Data">
                            Data
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="Fintech"
                          >
                            Fintech
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Design">
                            Design
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="SalesMarketing"
                          >
                            Sales / Marketing
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="ProductManagment"
                          >
                            Product Managment
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="ScrumMaster"
                          >
                            Scrum Master
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">
                        Employment Status
                      </FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem
                            value="Freelance"
                            className="cursor-pointer"
                          >
                            Freelance
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="FullTime"
                          >
                            FullTime
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="PartTime"
                          >
                            PartTime
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="OpentoOpportunities"
                          >
                            OpenToOpportunities
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workMode"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Work Mode</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem value="Hybrid" className="cursor-pointer">
                            Hybrid
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Remote">
                            Remote
                          </SelectItem>
                          <SelectItem className="cursor-pointer" value="Onsite">
                            Onsite
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Availability</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="cursor-pointer">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="cursor-pointer">
                          <SelectItem
                            value="OneMonth"
                            className="cursor-pointer"
                          >
                            1 Month
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="ThreeMonths"
                          >
                            3 Months
                          </SelectItem>
                          <SelectItem
                            className="cursor-pointer"
                            value="SixMonths"
                          >
                            6 Months
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentCompany"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="w-full">Current Company</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Current Company"
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
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
              {/* <DialogClose asChild> */}
              <Button
                disabled={isPending}
                type="submit"
                id="createEducationForm"
              >
                Add
              </Button>
              {/* </DialogClose> */}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
