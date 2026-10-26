import { SkillProficiency } from "./enum";

export interface Skill {
  skill_name: string;
  years_of_experience: number;
  proficiency: SkillProficiency;
}

export interface Project {
  title: string;
  role: string[];
  description: string;
  tech_stack: string[];
  outcome_or_metrics: string;
  live: string;
  github: string;
}
