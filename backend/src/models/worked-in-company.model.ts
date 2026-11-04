import mongoose, { Schema, Document } from "mongoose";

export interface IWorkedInCompany {
  user_id: mongoose.Types.ObjectId;
  company_name: string;
  role: string;
  start_year: number;
  end_year: number;
  description?: string;
}

export interface IWorkedInCompanySchema extends IWorkedInCompany, Document {}

const workedInCompanySchema = new Schema<IWorkedInCompanySchema>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    company_name: { type: String, required: true },
    role: { type: String, required: true },
    start_year: { type: Number, required: true },
    end_year: { type: Number, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

export const WorkedInCompany = mongoose.model<IWorkedInCompanySchema>(
  "WorkedInCompany",
  workedInCompanySchema,
);
