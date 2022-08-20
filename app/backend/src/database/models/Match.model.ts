import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team.model';

export default class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },

  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },

  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },

  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },

  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },

  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  modelName: 'matches',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatches' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatches' });
