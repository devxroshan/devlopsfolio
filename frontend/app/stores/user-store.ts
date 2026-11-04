import { create } from "zustand";

import type { User } from "../auth/type";

type State = Omit<User, "password"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type Action = {
  setUser: (user: Partial<State>) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  _id: "",
  name: "",
  email: "",
  is_client: false,
  is_email_verified: false,
  company: "",
  profile_pic: "",
  createdAt: "",
  updatedAt: "",
  setUser: (user) => set(() => ({ ...user })),
}));
