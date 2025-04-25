import express from "express";
import cors from 'cors'
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userAuthRouter from "./routes/userAuthRoutes.js";
import postRouter from "./routes/postRouter.js";

const app = express();
const port = process.env.PORT || 4000
connectDB()

const allowedOrigins = ['http://localhost:5173']


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))
// Express example
app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => res.send("API working correct"))
app.use('/blog-post/api/post', postRouter)
app.use('/blog-post/api/auth/user', userAuthRouter)

app.listen(port, () => console.log(`Server started on port ${port}`))