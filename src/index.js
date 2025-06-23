import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js"

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", userRouter)

const PORT = 8000;

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
