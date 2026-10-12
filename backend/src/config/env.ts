const requiredEnv = [
  "NODE_ENV",
  "PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "JWT_SECRET",
  "FRONTEND",
  "MONGO_URI",
  "APP_NAME",
] as const;

export const checkEnv = () => {
  for (const key of requiredEnv) {
    if (!process.env[key]?.trim()) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
};

export const env = {
  isDevelopment: (process.env.NODE_ENV as string) == "dev",
  PORT: Number(process.env.PORT),
  SMPT_USER: process.env.SMPT_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
  JWT_SECRET: process.env.JWT_SECRET!,
  FRONTEND: process.env.FRONTEND!,
  MONGO_URI: process.env.MONGO_URI!,
  APP_NAME: process.env.APP_NAME!,
} as const;
