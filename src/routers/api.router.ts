import { Router } from "express";
import uploadRouter from "./upload.router";
import watchRouter from "./watch.route";

const apiRouter = Router();

apiRouter.use("/upload", uploadRouter);
apiRouter.use("/watch", watchRouter);

export default apiRouter;
