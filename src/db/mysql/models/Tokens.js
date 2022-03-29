const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../index");

class Tokens extends Model {}

Tokens.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  refresh_token: DataTypes.STRING(),
  user_id: {
    type: DataTypes.STRING(64),
  },
  expiresIn: DataTypes.BIGINT,
  createdAt: DataTypes.DATE
}, {
  sequelize,
  modelName: "tokens",
  tableName: "tokens",
  timestamps: false
});

module.exports = Tokens;