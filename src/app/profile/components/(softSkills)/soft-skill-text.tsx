"use client";

import type { SoftSkills } from "~/next-auth";
import { MdOutlineCancel } from "react-icons/md";
import { SoftSkillDelete, TechSkillDelete } from "~/actions/profile";
import { toast } from "~/hooks/use-toast";
import { startTransition } from "react";

type SkillProps = { skill: SoftSkills; edit: boolean };

export default function SoftSkillText({ skill, edit }: SkillProps) {
  return (
    <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
      {skill.name}
      {edit && (
        <div
          className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
          onClick={() =>
            startTransition(async () => {
              await SoftSkillDelete(skill.id)
                .then(() => {
                  toast({
                    title: "Skill deleted",
                    description: "Skill has been deleted",
                  });
                })
                .catch((error) => {
                  toast({
                    title: "Error",
                    description: `Failed to delete skill`,
                  });
                });
            })
          }
        >
          <MdOutlineCancel className="text-red-500" />
        </div>
      )}
    </span>
  );
}
