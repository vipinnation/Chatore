import jwt from 'jsonwebtoken';
import Logger from '../../library/logger';
import { config } from '../../config/config';
import { RedisClient } from '../../redis/_init.redis';
import crypto from 'crypto'

const generateTokens = async (obj: {}, secret?: string) => {
  return new Promise<{ enc: string, token: string }>(async (resolve, reject) => {
    try {
      const token = await jwt.sign(obj, secret || config.jwt.JWT_SECRET, {
        expiresIn: config.jwt.JWT_EXPIRE
      });

      let encryptToken = await generateRandomString(32)


      await RedisClient.save(encryptToken, token);
      resolve({ enc: encryptToken, token });
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
};

const decodeToken = async (token: string, secret?: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = await jwt.verify(token, secret || config.jwt.JWT_SECRET);
      resolve(decoded);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
};

const generateRandomString = (length: number) => {
  return new Promise<string>(async (resolve, reject) => {
    let randomString = ""
    try {
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';


      const randomIndexes = Array.from({ length }, () => Math.floor(Math.random() * characters.length)).map(index => characters.charAt(index)).join('');

      const timestamp = Date.now();
      const messageWithTimestamp = `${randomIndexes}-${timestamp}`;
      randomString = messageWithTimestamp
      // Create the HMAC
      const hmac = crypto.createHmac("sha256", randomIndexes);
      hmac.update(messageWithTimestamp);
      resolve(hmac.digest('hex'))
    } catch (error) {
      resolve(randomString)
    }
  })
}
export { generateTokens, decodeToken };
