import mongoose, { Document, Schema } from "mongoose";

enum ELevel {
  ADVANCE,
  INTERMEDIATE,
  BEGINNER,
}

interface ISkill extends Document {
  name: string;
  experience_year: number;
  level: string;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
    },
    experience_year: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ELevel,
    },
  },
  { timestamps: true },
);

export const Skill = mongoose.model<ISkill>("Skill", skillSchema);
