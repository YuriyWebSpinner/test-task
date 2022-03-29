module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      ext: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      mime: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_upload: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      user_id: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('files');
  }
};