import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

const teamRoute = Router();

teamRoute.route('/')
  .get(TeamController.getAll);

export default teamRoute;
