import { Router } from "express";
import { prisma } from "../prisma";
import { comparePassword, createJWT, hashPassword } from "../utils/auth";
import { uniqueUsername, validateCredential } from "../utils/validation";

const authRouter = Router();

const signup = async (req, res) => {
  const { username, password, fullName } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password),
      fullName,
    },
  });

  const token = createJWT(user);
  res.status(200).json({ message: "Signup successful", token });
};
authRouter.post("/signup", validateCredential, uniqueUsername, signup);

const signin = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.status(404).json({ message: "Username not found" });
    return;
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    res.status(404).json({ message: "Wrong password" });
    return;
  }

  const token = createJWT(user);
  res.status(200).json({ message: "Signin successful", token });
};
authRouter.post("/signin", validateCredential, signin);

export default authRouter;
