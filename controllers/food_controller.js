import { getFoodList } from "../models/food_model.js";

export const getFoodList = async (req, reply) => {
  try {
    const res =  await models.Food.findAll();
    return reply.status(200).send({ food: res, message: "Food list retrieved successfully" });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}