import mongoose, { Document, Schema } from "mongoose";

enum EAvailability {
  NOT_AVAILABLE = "not available",
  PART_TIME = "part time",
  FULL_TIME = "full time",
}

export interface IDeveloperProfile {
  hourly_rate_rupees: number;
  availability: string;
  experience_years: number;
  location: string;
  time_zone: string;
  primary_category: string;
  discipline: string;
  bio: string;
}

export interface IDeveloperProfileSchema extends IDeveloperProfile, Document {
  user_id: mongoose.Types.ObjectId;
  rating: number;
}

const developerProfileSchema = new Schema<IDeveloperProfileSchema>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hourly_rate_rupees: { type: Number, required: true },
    availability: { type: String, enum: EAvailability, required: true },
    experience_years: { type: Number, required: true },
    location: { type: String, required: true },
    time_zone: { type: String, required: true },
    primary_category: { type: String, required: true },
    discipline: { type: String, required: true },
    bio: { type: String, default: "" },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const DeveloperProfile = mongoose.model<IDeveloperProfileSchema>(
  "DeveloperProfile",
  developerProfileSchema,
);
