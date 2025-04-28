import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userAuthRouter from "./routes/userAuthRoutes.js";
import postRouter from "./routes/postRouter.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://riseblog.netlify.app",
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/", (req, res) => res.send("API working correct"));

app.use("/api/post", postRouter);
app.use("/api/auth/user", userAuthRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
