import { sign, SignOptions } from 'jsonwebtoken';
import { TUser } from '../types';
import User from '../database/models/User.model';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  static async makeToken(data: TUser) {
    const jwtConfig: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '8h',
    };

    const payload = { data };

    const token = sign(payload, secret, jwtConfig);

    return token;
  }

  static async findOne(email: string): Promise<TUser> {
    const user = await User.findOne({
      where: { email },
      raw: true,
    }) as User;

    const { password, ...userData } = user;

    return userData as TUser;
  }
}
