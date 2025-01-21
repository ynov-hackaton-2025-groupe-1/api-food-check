import {
  getAll,
  getById,
  update,
} from "../controllers/user_controller.js";

const usersRoutes = async (fastify, options) => {
  fastify.get("/users", getAll);
  fastify.get("/user/:id", getById);
  fastify.put("/user", update);
}

export default usersRoutes;
