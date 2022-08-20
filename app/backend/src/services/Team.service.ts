import { DbTeam } from '../types';
import Team from '../database/models/Team.model';

export default class TeamService {
  static async getAll(): Promise<DbTeam[]> {
    const teams = await Team.findAll({ raw: true });

    return teams;
  }
}
