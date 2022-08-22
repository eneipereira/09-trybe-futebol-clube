import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const matchRoute = Router();

matchRoute.route('/')
  .get(MatchController.getAll)
  .post(MatchController.add);

matchRoute.route('/:id/finish')
  .patch(MatchController.finish);

matchRoute.route('/:id')
  .patch(MatchController.edit);

export default matchRoute;
