const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../index");

class Users extends Model {};

Users.init({
  id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
  modelName: "users",
  tableName: "users",
  timestamps: false
});

module.exports = Users;