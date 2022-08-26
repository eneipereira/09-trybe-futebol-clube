import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardRoute = Router();

leaderboardRoute.route('/home')
  .get(LeaderboardController.getHome);

leaderboardRoute.route('/away')
  .get(LeaderboardController.getAway);

leaderboardRoute.route('/')
  .get(LeaderboardController.getAll);

export default leaderboardRoute;
