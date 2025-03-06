import type { TechSkills } from "~/next-auth";

type SkillProps = { skill: TechSkills };

export default function CandidateTechSkillText({ skill }: SkillProps) {
  return (
    <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
      {skill.name}
    </span>
  );
}
