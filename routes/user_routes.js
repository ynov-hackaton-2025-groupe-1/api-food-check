import {
  getById,
  update,
} from "../controllers/user_controller.js";

const usersRoutes = async (fastify, options) => {
  fastify.get("/user", getById);
  fastify.put("/user", update);
}

export default usersRoutes;
