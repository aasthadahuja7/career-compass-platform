'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('results', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      analytical: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      creative: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      social: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      practical: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      business: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      personality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    // Add index for foreign key
    await queryInterface.addIndex('results', ['studentId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('results');
  }
};
