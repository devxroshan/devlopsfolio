import mongoose, { Document, Schema } from "mongoose";

export interface IVerificationSession extends Document {
  expires_at: Date;
  data: string;
}

const verificationSessionSchema: Schema<IVerificationSession> = new Schema(
  {
    expires_at: {
      type: Date,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const VerificationSession = mongoose.model<IVerificationSession>(
  "VerificationSession",
  verificationSessionSchema,
);
