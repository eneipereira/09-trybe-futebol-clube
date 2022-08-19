import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/User.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const body = await UserService.validateBodyLogin(req.body);

    const user = await UserService.getByEmail(body.email);

    const token = await UserService.makeToken(user);

    res.status(StatusCodes.OK).json({ token });
  }
}
