const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(64),
        unique: true,
        validate: {
          notEmpty: true,
        },
        set(value) {
          this.setDataValue('id', value.toLowerCase());
        }
      },
      password: {
        type: Sequelize.STRING(150),
        validate: {
          notEmpty: true,
        },
        async set(value) {
          const hashPassword = await bcrypt.hash(value, 3);
          this.setDataValue('password', hashPassword);
        }
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};