import { create } from "zustand";

import type { Developer, User } from "../auth/type";

type DeveloperProfile = Developer & {
  user_id: string;
  _id: string;
};

type State = Omit<User, "password"> & {
  _id: string;
  developer_profile: DeveloperProfile;
};

type Action = {
  setUser: (user: Partial<State>) => void;
  setDeveloperProfile: (developerProfile: DeveloperProfile) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  _id: "",
  name: "",
  email: "",
  is_client: false,
  is_email_verified: false,
  company: "",
  profile_pic: "",
  developer_profile: {} as DeveloperProfile,
  createdAt: "",
  updatedAt: "",
  setUser: (user) => set(() => ({ ...user })),
  setDeveloperProfile: (developerProfile) =>
    set((state) => ({ ...state, developer_profile: developerProfile })),
}));
