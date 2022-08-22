import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/User.service';
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

  static async add(req: Request, res: Response) {
    await UserService.readToken(req.headers.authorization);

    const newMatch = await MatchService.add(req.body);

    res.status(StatusCodes.CREATED).json(newMatch);
  }

  static async finish(req: Request, res: Response) {
    const { id } = await MatchService.validateParamsId(req.params);

    await MatchService.finish(id);

    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  static async edit(req: Request, res: Response) {
    const { id } = await MatchService.validateParamsId(req.params);

    const body = await MatchService.validateBodyEdit(req.body);

    const updatedScore = await MatchService.edit(id, body);

    res.status(StatusCodes.OK).json({ newScore: updatedScore });
  }
}
