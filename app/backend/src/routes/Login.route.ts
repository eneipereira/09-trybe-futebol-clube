import { Router } from 'express';
import UserController from '../controllers/User.controller';

const loginRoute = Router();

loginRoute.route('/')
  .post(UserController.login);

export default loginRoute;
