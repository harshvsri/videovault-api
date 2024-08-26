import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protectedRoute = (req, res, next) => {
  const bearer: string = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ message: "Not Authorized" });
    return;
  }

  const token = bearer.replace("Bearer ", "");
  if (!token) {
    res.status(401).send({ message: "Token Required" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Invalid Token" });
    return;
  }
};
