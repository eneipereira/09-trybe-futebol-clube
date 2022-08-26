import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardRoute = Router();

leaderboardRoute.route('/home')
  .get(LeaderboardController.getHome);

export default leaderboardRoute;
