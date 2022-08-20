import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

const teamRoute = Router();

teamRoute.route('/')
  .get(TeamController.getAll);

teamRoute.route('/:id')
  .get(TeamController.getById);

export default teamRoute;
