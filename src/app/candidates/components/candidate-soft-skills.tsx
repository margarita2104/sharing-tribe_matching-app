import type { SoftSkills } from "~/next-auth";
import CandidateSoftSkillText from "./candidate-soft-skill-text";

type SoftSkillsProp = {
  softSkills: SoftSkills[];
};

export default function CandidateSoftSkills({ softSkills }: SoftSkillsProp) {
  return (
    <div className="ml-5 flex flex-wrap items-center gap-2">
      {softSkills.map((skill, index) => (
        <CandidateSoftSkillText key={index} skill={skill} />
      ))}
    </div>
  );
}
