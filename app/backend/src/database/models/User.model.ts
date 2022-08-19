import { STRING, INTEGER, Model } from 'sequelize';

import db from '.';

export default class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },

  username: {
    allowNull: false,
    type: STRING,
  },

  role: {
    allowNull: false,
    type: STRING,
  },

  email: {
    allowNull: false,
    type: STRING,
  },

  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  modelName: 'users',
  sequelize: db,
  timestamps: false,
  underscored: true,
});
