import Joi = require('joi');
import { NewMatch, DbMatch, Indexable } from '../types';
import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';
import runSchema from './runSchema';

export default class MatchService {
  static async validateParamsId(params: unknown): Promise<Indexable> {
    const result = runSchema(Joi.object<Indexable>({
      id: Joi.number().required().positive().integer(),
    }))(params);

    return result;
  }

  static async getAll() {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async getByQuery(inProgress: boolean) {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async add(body: NewMatch): Promise<DbMatch> {
    const newMatch = await Match.create({
      ...body,
      inProgress: true,
    }, { raw: true });

    return newMatch as DbMatch;
  }

  static async finish(id: number): Promise<void> {
    await Match.update({ inProgress: false }, { where: { id } });
  }
}
