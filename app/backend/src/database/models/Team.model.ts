import { STRING, INTEGER, Model } from 'sequelize';

import db from '.';

export default class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  modelName: 'teams',
  sequelize: db,
  timestamps: false,
  underscored: true,
});
