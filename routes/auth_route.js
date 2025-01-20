import {login, register} from "../controllers/auth_controller.js";

const authRoutes = async (fastify, options) => {
  fastify.post("/register", login);
  fastify.post("/login", register);
}

export default authRoutes;