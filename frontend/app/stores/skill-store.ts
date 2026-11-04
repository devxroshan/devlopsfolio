import { create } from "zustand";
import { SkillProficiency } from "../portfolio-skills/enum";

interface SkillState {
  _id: string;
  user_id: string;
  name: string;
  experience_year: number;
  proficiency_level: SkillProficiency | undefined;
}

interface State {
  skills: SkillState[];
}

interface Action {
  setSkill: (skills: SkillState[]) => void;
  removeSkill: (id: string) => void;
}

export const useSkillStore = create<State & Action>((set) => ({
  skills: [],
  setSkill: (skills) => set((state) => ({ ...state, skills })),
  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill._id !== id),
    })),
}));
