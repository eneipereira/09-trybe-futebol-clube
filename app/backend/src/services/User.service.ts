import { JsonWebTokenError, sign, SignOptions, verify } from 'jsonwebtoken';
import Joi = require('joi');
import { compare } from 'bcryptjs';
import { DbUser, Login, TUser } from '../types';
import User from '../database/models/User.model';
import runSchema from './runSchema';
import UnauthorizedError from '../errors/UnauthorizedError';

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

    const token = sign(data, secret, jwtConfig);

    return token;
  }

  static async readToken(token: string | undefined): Promise<DbUser> {
    if (!token) {
      throw new JsonWebTokenError('Token must be a valid token');
    }

    const payload = verify(token, secret, (err, decoded) => {
      if (err && (err.message.includes('invalid') || err.message.includes('malformed'))) {
        throw new JsonWebTokenError('Token must be a valid token');
      }
      return decoded;
    });

    return payload as unknown as DbUser;
  }

  static async getByEmail(email: string): Promise<DbUser> {
    const user = await User.findOne({
      where: { email },
      raw: true,
    }) as User;

    if (!user) throw new UnauthorizedError();

    return user as DbUser;
  }

  static async verifyPassword(password: string, hashPassword: string): Promise<void> {
    const isValid = await compare(password, hashPassword);

    if (!isValid) throw new UnauthorizedError();
  }
}
