import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  role: string[];
  description: string;
  tech_stack: string[];
  outcome_or_metrics: string;
  live: string;
  github: string;
  status: "active" | "inactive"
}

const projectSchema = new Schema<IProject>(
  {
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
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "inactive"
    }
  },
  { timestamps: true },
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
