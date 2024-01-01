import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../../config/config';
import { RedisClient } from '../../redis/_init.redis';
import Logger from '../../library/logger';
import User from '../model/user.model'

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(res.status(403).json({ msg: 'Not Authorized' }));
  }

  try {
    /** if TOKEN is valid then verify token and user */
    // const redisKey: any = await RedisClient.get(token);

    // if (!redisKey) {
    //   return next(res.status(403).json({ msg: 'Session expired' }));
    // }
    const decoded: any = jwt.verify(token, config.jwt.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(res.status(403).json({ msg: 'User Not Found with This Id' }));
    }
    req.user = user;
    next();
  } catch (error) {
    Logger.error(error);
    return next(res.status(403).json({ msg: 'Session expired' }));
  }
};

export default checkAuth;
