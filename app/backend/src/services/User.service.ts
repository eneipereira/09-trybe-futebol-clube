import { sign, SignOptions } from 'jsonwebtoken';
import Joi = require('joi');
import { Login, TUser } from '../types';
import User from '../database/models/User.model';
import runSchema from './runSchema';
import UserNotFound from '../errors/UserNotFound';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  static async validateBodyLogin(body: Login): Promise<Login> {
    const result = runSchema(Joi.object<Login>({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }).messages({
      'any.required': 'All fields must be filled',
      'string.empty': 'All fields must be filled',
    }))(body);

    return result;
  }

  static async makeToken(data: TUser) {
    const jwtConfig: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '8h',
    };

    const payload = { data };

    const token = sign(payload, secret, jwtConfig);

    return token;
  }

  static async getByEmail(email: string): Promise<TUser> {
    const user = await User.findOne({
      where: { email },
      raw: true,
    }) as User;

    if (!user) throw new UserNotFound();

    const { password, ...userData } = user;

    return userData as TUser;
  }
}
