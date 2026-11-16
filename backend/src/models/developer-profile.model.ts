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
  title: string;
  discipline: string;
  bio: string;
  core_competencies: string[];
  social_links?: string[];
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
    title: { type: String, required: true },
    discipline: { type: String, required: true },
    bio: {
      type: String,
      required: true,
      maxLength: [700, "Bio cannot exceed 700 characters."],
    },
    rating: { type: Number, default: 0 },
    core_competencies: {
      type: [
        {
          type: String,
          trim: true,
          maxLength: [100, "Each competency cannot exceed 100 characters."],
        },
      ],
    },
    social_links: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const DeveloperProfile = mongoose.model<IDeveloperProfileSchema>(
  "DeveloperProfile",
  developerProfileSchema,
);
