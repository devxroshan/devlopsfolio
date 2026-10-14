import mongoose, { Document, Schema } from "mongoose";

export interface IDeveloperProject {
  title: string;
  role: string[];
  description: string;
  tech_stack: string[];
  outcome_or_metrics: string;
  live: string;
  github: string;
}

export interface IDeveloperProjectSchema extends IDeveloperProject, Document {
  user_id: mongoose.Types.ObjectId;
}

const developerProjectSchema = new Schema<IDeveloperProjectSchema>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    role: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    outcome_or_metrics: {
      type: String,
      default: "",
    },
    live: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const DeveloperProject = mongoose.model<IDeveloperProjectSchema>(
  "DeveloperProject",
  developerProjectSchema,
);
