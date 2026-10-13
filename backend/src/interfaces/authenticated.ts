import type { IDeveloperProfile } from "../models/developer-profile.model.js";
import type { IUser } from "../models/user.model.js";

export interface IAuthenticatedUser extends Omit<IUser, "password"> {
  _id: string;
}

export interface IAuthenticatedDeveloperProfile extends IDeveloperProfile {
  _id: string;
  user_id: string;
}

export type IAuthenticated = IAuthenticatedUser &
  Omit<IAuthenticatedDeveloperProfile, "_id">;
