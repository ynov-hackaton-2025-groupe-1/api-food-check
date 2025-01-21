import { getFoodList } from "../controllers/food_controller";

const foodRoutes = async (fastify, options) => {
  fastify.get("/food", getFoodList);
}

export default foodRoutes;