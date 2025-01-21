import { models } from "../database/models/index.js";

export const getFoodList = async () => {
  const food = await models.Food.findAll();
  return food;
}
