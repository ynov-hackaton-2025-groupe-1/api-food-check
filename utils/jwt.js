import jwt from "jsonwebtoken";

export const generateToken = (payload, ) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
  return token;
} 
