'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} DataTypes
   */
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      teamName: {
        allowNull: false,
        field: 'team_name',
        type: DataTypes.STRING,
      }
    });
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
