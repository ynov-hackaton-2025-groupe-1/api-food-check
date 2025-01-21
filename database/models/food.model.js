import { DataTypes } from "@sequelize/core";
import { sequelize } from "../sequelizeConnection.js";

const Food = sequelize.define("food", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carbon: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
},{
  tableName: "foods",
  timestamps: true,
});

export default Food;