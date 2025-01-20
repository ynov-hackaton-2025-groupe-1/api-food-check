import jwt from "@fastify/jwt";

export const generateToken = (payload, time) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: time});
  return token;
} 
