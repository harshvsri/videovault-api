import("dotenv/config");
import express from "express";
import cors from "cors";
import morgan from "morgan";
import corsOptions from "./configs/cors.config";
import indexRouter from "./routers/index.router";
import authRouter from "./routers/auth.router";
import apiRouter from "./routers/api.router";
import { error404Handler, errorHandler } from "./utils/error";
import { protectedRoute } from "./utils/auth";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api", protectedRoute, apiRouter);

app.listen(PORT, () => {
  console.log(
    `Server is listening at http://localhost:${PORT} (internal docker port)`
  );
});

app.use(error404Handler);
app.use(errorHandler);
