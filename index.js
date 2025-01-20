import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import dotenv from "dotenv";
import { connectDbSequelize } from "./database/sequelizeConnection.js";

const fastify = Fastify({ logger: true });

dotenv.config();

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

fastify.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [process.env.FRONTEND_URL];
    if (allowedOrigins.includes(origin) || !origin) {
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

const startApi = async () => {
  try {
    await connectDbSequelize();
    await fastify.listen({ port: process.env.PORT || 4000 });
    console.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

await startApi();