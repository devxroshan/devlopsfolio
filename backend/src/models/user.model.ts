import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  profile_pic: string;
  is_email_verified: boolean;
  company: string;
  is_client: boolean;
}

interface IUserSchema extends IUser, Document {}

const userSchema = new Schema<IUserSchema>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_pic: { type: String, default: "" },
    is_email_verified: { type: Boolean, default: false },
    company: { type: String, default: "" },
    is_client: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUserSchema>("User", userSchema);
