const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../index");
const Tokens = require('./Tokens');
const Files = require('./Files');


class Users extends Model {};

Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
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

Users.hasMany(Files, {foreignKey: 'user_id'});
Users.hasMany(Tokens, {foreignKey: 'user_id'});
Files.belongsTo(Users);
Tokens.belongsTo(Users);

module.exports = Users;