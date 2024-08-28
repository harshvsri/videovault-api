import { Router } from "express";
import { prisma } from "../prisma";
import { validateWatch } from "../utils/validation";

const watchRouter = Router();

watchRouter.get("/", validateWatch, async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 12;
  const page = parseInt(req.query.page as string) || 1;

  const uploads = await prisma.upload.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      createdAt: "desc", // Ensure consistent ordering
    },
  });

  res.status(200).json({ uploads });
});

watchRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const upload = await prisma.upload.findUnique({
    where: {
      id,
    },
  });
  if (!upload) {
    res.status(400).json({ message: "No such video found" });
  }
  res.status(200).json({ message: "Video found", upload });
});

export default watchRouter;
