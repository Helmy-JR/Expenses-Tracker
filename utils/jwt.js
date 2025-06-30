import jwt from "jsonwebtoken";

const signtoken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifytoken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { signtoken, verifytoken };
