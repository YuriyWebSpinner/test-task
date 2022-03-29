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
    references: 'users',
    referencesKey: 'id'
  },
  expiresIn: DataTypes.BIGINT,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: "tokens",
  tableName: "tokens",
  timestamps: false
});

module.exports = Tokens;