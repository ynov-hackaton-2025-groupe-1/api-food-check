import { Sequelize } from "@sequelize/core";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
});

export const connectDbSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.info("Sequelization Connect done");
  } catch (err) {
    console.error("Sequelization Connect Error", err);
  }
};
