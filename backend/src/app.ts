import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { checkEnv } from "./config/env.js";

// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import developerProjectRoutes from "./modules/developer-project/developer-project.routes.js";
import skillRoutes from "./modules/skill/skill.routes.js";

// Filters
import { allExceptionFilter } from "./filters/all-exceptions.filter.js";

// db
import connectDB from "./config/db.js";

checkEnv();

const app = express();
const port = Number(process.env.PORT as string) || 8000;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/developer-project", developerProjectRoutes);
app.use("/api/v1/skill", skillRoutes);

// dev case
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Welcome to the Devlopsfolio API");
});

app.use(allExceptionFilter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
