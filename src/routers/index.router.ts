import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.status(200).json({
    name: "VideoVault API",
    description: "A video upload and stream platform",
    creator: "Harsh V Srivastava",
    routes: {
      "/auth": {
        description: "Authentication routes",
        subroutes: {
          signup: {
            description: "User signup",
          },
          signin: {
            description: "User signin",
          },
        },
      },
      "/api": {
        description: "API routes",
        subroutes: {
          upload: {
            description: "Upload videos",
          },
          watch: {
            description: "Watch videos",
          },
        },
      },
    },
  });
});

export default indexRouter;
