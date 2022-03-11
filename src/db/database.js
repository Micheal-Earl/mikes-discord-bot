const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

DB = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false, //console.log
  storage: path.resolve("src/db/database.sqlite"),
  define: {
    freezeTableName: true,
  },
});

Models = {
  User: DB.define(
    "User",
    {
      userID: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      posX: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      posY: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      DB,
      modelName: "User",
    }
  ),
};

module.exports = { DB, Models };
