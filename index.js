import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { connectDbSequelize } from "./database/sequelizeConnection.js";
import authRoutes from "./routes/auth_route.js";
import usersRoutes from "./routes/user_routes.js";
import fastifyJwt from "@fastify/jwt";
import middie from "@fastify/middie";
import { authMiddleware } from "./middleware/auth_middleware.js";

const fastify = Fastify({ logger: true });

dotenv.config();

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

fastify.register(middie);
fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(authMiddleware);
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