import { create } from "zustand";
import { CreateRoleSchema } from "../portfolio-skills/role-api/schema/create-role.schema";

type RoleState = CreateRoleSchema & { _id: string };

type State = {
  roles: RoleState[];
};

type Action = {
  setRoles: (roles: RoleState[]) => void;
  addRole: (role: RoleState) => void;
  removeRole: (id: string) => void;
  clearRoles: () => void;
};

export const useRoleStore = create<State & Action>((set) => ({
  roles: [],
  setRoles: (roles) => set({ roles }),
  addRole: (role) =>
    set((state) => ({
      roles: [...state.roles, role],
    })),
  removeRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role._id !== id),
    })),
  clearRoles: () => set({ roles: [] }),
}));
