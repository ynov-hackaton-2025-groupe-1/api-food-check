import { getAllFood } from "../controllers/food_controller.js";

const foodRoutes = async (fastify, options) => {
  fastify.get("/food", getAllFood);
}

export default foodRoutes;