import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchService from '../services/Match.service';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress?.length) {
      const matches = await MatchService.getByQuery(inProgress === 'true');

      res.status(StatusCodes.OK).json(matches);
      return;
    }

    const matches = await MatchService.getAll();

    res.status(StatusCodes.OK).json(matches);
  }
}
