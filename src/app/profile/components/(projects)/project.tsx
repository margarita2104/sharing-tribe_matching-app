"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { ProjectSchema } from "../../../../schema/index";
import { CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { projectUpdate, uploadImageProject } from "../../../../actions/profile";
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
import { DeleteModal } from "../(references)/modal-delete";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

type ProjectProp = {
  project: {
    id: number;
    title: string;
    role: string;
    description: string;
    link: string | null;
    projectImage: string;
    userId: string;
  };
};

export function ProjectComponent({ project }: ProjectProp) {
  const [error, setError] = useState<string | undefined>();
  const [edit, setEdit] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: project.title,
      role: project.role,
      link: project.link ?? "",
      description: project.description,
      projectImage: project.projectImage,
    },
  });

  const onSubmit = async (data: z.infer<typeof ProjectSchema>) => {
    const formData = new FormData();
    let imageUrl = project.projectImage || "";

    Object.entries(data).forEach(([key, value]) => {
      if (key === "projectImage" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "projectImage") {
        formData.append(key, value as string);
      }
    });

    if (formData.get("projectImage")) {
      const response = await uploadImageProject(formData);
      if (response.error) {
        toast({
          title: "Error",
          description: "Image upload failed. " + response.error,
          variant: "destructive",
        });
        return;
      }
      imageUrl = response.imageUrl ?? "";
    }

    startTransition(() => {
      projectUpdate({ ...data, projectImage: imageUrl }, project.id)
        .then(async (response) => {
          await update();
          toast({
            title: "Success",
            description: "Project updated successfully!",
          });
          setEdit(false);
        })
        .catch((err) => {
          console.error("Error during project update:", err);
          toast({
            title: "Error",
            description: "An error occurred while updating the project.",
            variant: "destructive",
          });
        });
    });
  };

  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Projects</h2>
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
        {isPending ? (
          <LoadingSpinner className="mx-auto" />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="w-full">Project Title</FormLabel>

                        <FormControl>
                          {edit ? (
                            <Input
                              {...field}
                              placeholder="Project Title"
                              disabled={isPending}
                            />
                          ) : (
                            <p className="w-full">{project.title}</p>
                          )}
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="w-full">
                          Role in the Project
                        </FormLabel>
                        <FormControl>
                          {edit ? (
                            <Input
                              {...field}
                              placeholder="Role in the Project"
                              disabled={isPending}
                            />
                          ) : (
                            <p className="w-full">{project.role ?? "N/A"}</p>
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
                  defaultValue={project.userId}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="w-full">Description</FormLabel>
                        <FormControl>
                          {edit ? (
                            <Input
                              {...field}
                              placeholder="Description"
                              disabled={isPending}
                            />
                          ) : (
                            <p className="w-full">
                              {project.description ?? "N/A"}
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
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="w-full">
                          Link to the Project
                        </FormLabel>
                        <FormControl>
                          {edit ? (
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              placeholder="Link to the Project"
                              disabled={isPending}
                            />
                          ) : (
                            <p className="w-full">{project.link ?? "N/A"}</p>
                          )}
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectImage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="w-full">Project Image</FormLabel>
                        <FormControl>
                          {edit ? (
                            <Input
                              type="file"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0])
                              }
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                              accept="image/*"
                              className="w-full cursor-pointer"
                            />
                          ) : (
                            <div className="w-full justify-end">
                              {project.projectImage ? (
                                <Image
                                  src={project.projectImage}
                                  alt="Project Image"
                                  width={128}
                                  height={96}
                                  className="h-24 w-32 rounded-md object-cover"
                                />
                              ) : null}
                            </div>
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
                    isPending={isPending}
                    id={project.id}
                    name="project"
                  />
                </div>
              ) : null}
            </form>
          </Form>
        )}
      </CardContent>
    </>
  );
}
