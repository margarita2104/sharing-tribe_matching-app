import { type Project } from "@prisma/client";
import Image from "next/image";
import { CardContent, CardHeader } from "~/components/ui/card";

export default function CandidateProject({ project }: { project: Project }) {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">Projects</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="w-full">Project Title</p>
            <p className="w-full">{project.title}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Role in the Project</p>
            <p className="w-full">{project.role ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Description</p>
            <p className="w-full">{project.description ?? "N/A"}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-full">Link to the Project</p>
            <p className="w-full">{project.link ?? "N/A"}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="w-full place-self-start">Project Image</p>
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
          </div>
        </div>
      </CardContent>
    </>
  );
}
