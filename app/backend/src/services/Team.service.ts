import Joi = require('joi');
import { DbTeam, Indexable } from '../types';
import Team from '../database/models/Team.model';
import NotFoundError from '../errors/NotFoundError';
import runSchema from './runSchema';

export default class TeamService {
  static async validateParamsId(params: unknown): Promise<Indexable> {
    const result = runSchema(Joi.object<Indexable>({
      id: Joi.number().required().positive().integer(),
    }))(params);

    return result;
  }

  static async getAll(): Promise<DbTeam[]> {
    const teams = await Team.findAll({ raw: true });

    return teams;
  }

  static async getById(id: DbTeam['id']): Promise<DbTeam> {
    const team = await Team.findOne({
      where: { id },
      raw: true,
    });

    if (!team) throw new NotFoundError('Team not found');

    return team as DbTeam;
  }
}
