import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { connectDbSequelize } from "./database/sequelizeConnection.js";
import authRoutes from "./routes/auth_route.js";
import usersRoutes from "./routes/user_routes.js";
import foodRoutes from "./routes/food_route.js";
import fastifyJwt from "@fastify/jwt";
import middie from "@fastify/middie";
import { authMiddleware } from "./middleware/auth_middleware.js";

const fastify = Fastify({ logger: true });

dotenv.config();

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

fastify.register(middie);
fastify.register(authMiddleware);
const routes = [
  { route: authRoutes, prefix: "/api/auth" },
  { route: usersRoutes, prefix: "/api" },
  { route: foodRoutes, prefix: "/api" },
];

routes.forEach(({ route, prefix }) => {
  fastify.register(route, { prefix });
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