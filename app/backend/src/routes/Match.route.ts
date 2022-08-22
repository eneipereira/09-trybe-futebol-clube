import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const matchRoute = Router();

matchRoute.route('/')
  .get(MatchController.getAll)
  .post(MatchController.add);

export default matchRoute;
