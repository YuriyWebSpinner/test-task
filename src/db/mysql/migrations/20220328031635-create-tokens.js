module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      refresh_token: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      user_id: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      expiresIn: Sequelize.BIGINT,
      createdAt: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('tokens');
  }
};