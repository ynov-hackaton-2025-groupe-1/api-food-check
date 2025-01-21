import { getFoodList } from "../models/food_model.js";

export const getAllFood = async (req, reply) => {
  try {
    const res =  await getFoodList();
    return reply.status(200).send({ food: res, message: "Food list retrieved successfully" });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}