import {login, register} from "../controllers/auth_controller.js";

const authRoutes = async (fastify, options) => {
  fastify.post("/register", register);
  fastify.post("/login", login);
}

export default authRoutes;