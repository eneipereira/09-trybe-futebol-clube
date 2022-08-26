import { Leaderboard } from '../types';
import * as leaderboardCalc from './helpers/leaderboardCalc';
import MatchService from './Match.service';
import TeamService from './Team.service';

export default class LeaderboardService {
  private static async create(type: string) {
    const teams = await TeamService.getAll();

    const leaderboard = await Promise.all(teams.map(async (team) => {
      const matchesById = await MatchService.getFinished(team.id, type);
      const VDL = await leaderboardCalc.calculateTotalVDL(matchesById, type);
      const goals = await leaderboardCalc.calculateTotalGoals(matchesById, type);

      const totalPoints = await leaderboardCalc.calculateTotalPoints(VDL);

      const totalGames = matchesById.length;

      const efficiency = await leaderboardCalc.calculateEfficiency(totalPoints, totalGames);

      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        ...VDL,
        ...goals,
        efficiency,
      };
    }));

    return leaderboard;
  }

  private static async sort(leaderboard: Leaderboard[]): Promise<Leaderboard[]> {
    const board = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return board;
  }

  static async getHome() {
    const homeBoard = await LeaderboardService.create('homeTeam');
    const sortedHome = await LeaderboardService.sort(homeBoard);

    return sortedHome;
  }
}
