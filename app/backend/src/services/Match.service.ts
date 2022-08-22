import Joi = require('joi');
import { NewMatch, DbMatch, Indexable, UpdatedMatch, NewScores } from '../types';
import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';
import runSchema from './runSchema';
import UnauthorizedError from '../errors/UnauthorizedError';
import NotFoundError from '../errors/NotFoundError';

export default class MatchService {
  static async validateParamsId(params: unknown): Promise<Indexable> {
    const result = runSchema(Joi.object<Indexable>({
      id: Joi.number().required().positive().integer(),
    }))(params);

    return result;
  }

  static async validateBodyEdit(body: NewScores): Promise<NewScores> {
    const result = runSchema(Joi.object<NewScores>({
      homeTeamGoals: Joi.number().required().integer().positive(),
      awayTeamGoals: Joi.number().required().integer().positive(),
    }))(body);

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
    const { homeTeam, awayTeam } = body;

    const [isValidHome, isValidAway] = await Promise.all([
      Team.findOne({ where: { id: homeTeam } }),
      Team.findOne({ where: { id: awayTeam } }),
    ]);

    if (!isValidHome || !isValidAway) throw new NotFoundError('There is no team with such id!');

    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }

    const newMatch = await Match.create({
      ...body,
      inProgress: true,
    }, { raw: true });

    return newMatch as DbMatch;
  }

  static async finish(id: number): Promise<void> {
    await Match.update({ inProgress: false }, { where: { id } });
  }

  static async edit(id: number, newScores: NewScores): Promise<UpdatedMatch> {
    const isValidMatch = await Match.findOne({
      where: { id },
    });

    if (!isValidMatch) throw new NotFoundError('Match not found!');

    if (!isValidMatch.inProgress) {
      throw new UnauthorizedError('Can\'t update finished matches');
    }

    await Match.update(newScores, { where: { id } });

    const updatedMatch = await Match.findOne({
      where: { id },
    });

    return updatedMatch as unknown as UpdatedMatch;
  }
}
