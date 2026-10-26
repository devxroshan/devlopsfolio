import { SkillProficiency } from "./enum";

export interface Skill {
  skill_name: string;
  years_of_experience: number;
  proficiency: SkillProficiency;
}
