import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/Team.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamService.getAll();

    res.status(StatusCodes.OK).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = await TeamService.validateParamsId(req.params);

    const team = await TeamService.getById(id);

    res.status(StatusCodes.OK).json(team);
  }
}
