import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { connectDbSequelize } from "./database/sequelizeConnection.js";
import authRoutes from "./routes/auth_route.js";
import usersRoutes from "./routes/user_routes.js";

const fastify = Fastify({ logger: true });

dotenv.config();

fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(usersRoutes, { prefix: "/api" });

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