/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express';

const errors: Record<string, number> = {
  ValidationError: 400,
  JsonWebTokenError: 401,
  UnauthorizedError: 401,
  NotFoundError: 404,
};

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;

  const status = errors[name];

  if (!status) return res.status(500).json({ message });

  res.status(status).json({ message });
};

export default errorHandler;
