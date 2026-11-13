import type { IDeveloperProfile } from "../models/developer-profile.model.js";
import type { IUser } from "../modules/user/model/user.model.js";

export interface IAuthenticatedUser extends Omit<IUser, "password"> {
  _id: string;
}

export interface IAuthenticatedDeveloperProfile extends IDeveloperProfile {
  _id: string;
  user_id: string;
}