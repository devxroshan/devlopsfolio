import { create } from "zustand";

import type { Developer, User } from "../auth/type";

type DeveloperProfile = Partial<Developer> & {
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
  developer_profile: {
    user_id: "",
    _id: "",
    social_links: [],
  },
  createdAt: "",
  updatedAt: "",
  setUser: (user) => set(() => ({ ...user })),
  setDeveloperProfile: (developerProfile) =>
    set((state) => ({ ...state, developer_profile: developerProfile })),
}));
