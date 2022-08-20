'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} DataTypes
   */
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      homeTeam: {
        allowNull: false,
        field: 'home_team',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id'
        },
        type: DataTypes.INTEGER
      },
      
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: DataTypes.INTEGER
      },
      
      awayTeam: {
        allowNull: false,
        field: 'away_team',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id'
        },
        type: DataTypes.INTEGER
      },
      
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: DataTypes.INTEGER
      },
      
      inProgress: {
        allowNull: false,
        field: 'in_progress',
        type: DataTypes.BOOLEAN
      }
    });
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};
