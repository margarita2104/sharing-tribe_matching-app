import type { TechSkills } from "~/next-auth";
import CandidateTechSkillText from "./candidate-tech-skill-text";

type TechSkillProps = {
  techSkills: TechSkills[];
};

export default function CandidateTechSkills({ techSkills }: TechSkillProps) {
  return (
    <div className="ml-5 flex flex-wrap items-center gap-2">
      {techSkills.map((skill, index) => (
        <CandidateTechSkillText key={index} skill={skill} />
      ))}
    </div>
  );
}
