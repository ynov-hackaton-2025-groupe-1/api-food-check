import {
  findUserById,
  deleteUser,
  updateUser,
} from "../models/user_model.js";

export const getById = async (request, reply) => {
  const { id } = request.params;
  console.log("id", id);
  const user = await findUserById(id);
  console.log("user", user);
  return reply.send(user);
};

export const remove = async (request, reply) => {
  const { id } = request.params;
  await deleteUser(id);
  return reply.send("user deleted");
};

export const update = async (request, reply) => {
  const { id } = request.params;
  const user = request.body;

  try {
    const updatedUser = await updateUser(id, user);
    if (updatedUser[0] === 0) {
      return reply.status(404).json({ message: "User not found" });
    }
    return reply.status(200).send({message: "User updated", data: updatedUser[1][0].dataValues});
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
};