import { SkillProficiency } from "./enum";

export interface Skill {
  name: string;
  experience_year: number;
  proficiency_level: SkillProficiency;
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
