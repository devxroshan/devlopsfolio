import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./modules/auth/auth.routes.js";

// Filters
import { allExceptionFilter } from "./filters/all-exceptions.filter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);


// dev case
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Welcome to the Devlopsfolio API");
});

app.use(allExceptionFilter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
