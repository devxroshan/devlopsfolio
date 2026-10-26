import mongoose, { Document, Schema } from "mongoose";

enum ELevel {
  EXPERT = "expert",
  INTERMEDIATE = "Intermediate",
  BEGINNER = "beginner",
}

export interface ISkill {
  name: string;
  experience_year: number;
  proficiency_level: string;
}

export interface ISkillSchema extends ISkill, Document {
  user_id: mongoose.Types.ObjectId;
}

const skillSchema = new Schema<ISkillSchema>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    experience_year: {
      type: Number,
      required: true,
    },
    proficiency_level: {
      type: String,
      required: true,
      enum: ELevel,
    },
  },
  { timestamps: true },
);

export const Skill = mongoose.model<ISkillSchema>("Skill", skillSchema);
