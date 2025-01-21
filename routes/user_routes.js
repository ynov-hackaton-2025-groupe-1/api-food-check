import {
  getById,
  update,
} from "../controllers/user_controller.js";

const usersRoutes = async (fastify, options) => {
  fastify.get("/user/:id", getById);
  fastify.put("/user/:id", update);
}

export default usersRoutes;
