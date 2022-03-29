const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../index");

class Files extends Model {};

Files.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ext: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  mime: {
    type: DataTypes.STRING(64),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date_upload: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.STRING(150),
    allowNull: false,
    references: 'users',
    referencesKey: 'id'
  },
}, {
  sequelize,
  modelName: "files",
  tableName: "files",
  timestamps: false
});

module.exports = Files;