'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} DataTypes
   */
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      username: {
        allowNull: false,
        type: DataTypes.STRING
      },

      role: {
        allowNull: false,
        type: DataTypes.STRING
      },

      email: {
        allowNull: false,
        type: DataTypes.STRING
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING
      }
    });
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   */
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
