'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('ECONOMY', 'BUSINESS', 'PREMIUM', 'FIRST_CLASS'),
        allowNull: false,
        defaultValue: 'ECONOMY'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Seats_type";'); // For PostgreSQL
  }
};
