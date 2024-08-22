import { Router } from "express";
import uploadRouter from "./upload.router";

const apiRouter = Router();

apiRouter.use("/upload", uploadRouter);

export default apiRouter;
