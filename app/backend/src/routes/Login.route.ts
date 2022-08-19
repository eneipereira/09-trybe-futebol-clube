import { Router } from 'express';
import UserController from '../controllers/User.controller';

const loginRoute = Router();

loginRoute.route('/')
  .post(UserController.login);

loginRoute.route('/validate')
  .get(UserController.validate);

export default loginRoute;
