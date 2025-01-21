import { DataTypes } from "@sequelize/core";
import { sequelize } from "../sequelizeConnection.js";
import User from "./user.model.js";
import Food from "./food.model.js";

const History = sequelize.define("history", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  foodId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Food,
      key: 'id'
    }
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
},{
  tableName: "histories",
  timestamps: true,
});

User.hasMany(History, { foreignKey: 'userId' });
Food.hasMany(History, { foreignKey: 'foodId' });
History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(Food, { foreignKey: 'foodId' });

export default History;