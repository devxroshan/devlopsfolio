import { EAvailability } from "./enums";

export type User = {
  name: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  profile_pic: string;
  is_client: boolean;
  company: string;
};

export type Developer = {
  discipline: string;
  title: string;
  time_zone: string;
  location: string;
  experience_years: number;
  availability: EAvailability;
  hourly_rate_rupees: number;
};