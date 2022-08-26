import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getHome(_req: Request, res: Response) {
    const homeRanking = await LeaderboardService.getHome();

    res.status(StatusCodes.OK).json(homeRanking);
  }

  static async getAway(_req: Request, res: Response) {
    const awayRanking = await LeaderboardService.getAway();

    res.status(StatusCodes.OK).json(awayRanking);
  }
}
