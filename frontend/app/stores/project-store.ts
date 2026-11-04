import { create } from "zustand";
import { Project } from "../portfolio-skills/type";

type ProjectState = Project & { _id: string };

type State = {
  projects: ProjectState[];
};

type Action = {
  setProjects: (projects: ProjectState[]) => void;
  addProject: (project: ProjectState) => void;
  removeProject: (id: string) => void;
  clearProject: () => void;
};

export const useProjectStore = create<State & Action>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project._id !== id),
    })),
  clearProject: () => set({ projects: [] }),
}));
