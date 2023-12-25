import { createClient } from 'redis';
import Logger from '../library/logger';

// Connecting redis
const client = createClient({ url: 'rediss://red-cjuuueh5mpss7386naug:KR97AlJMeCanpc9zvPEijsdE9igZWKVS@oregon-redis.render.com:6379' });

client.on('error', (err: any) => Logger.error(err));
client.on('connect', () => Logger.success('Redis connected successfully'));
client.on('end', () => Logger.success('Redis disconnected successfully'));

// eslint-disable-next-line no-void
void (async function () {
  await client.connect();
})();

// save key in redis in key value pair
const save = (key: string, value: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      await client.SET(key, value, {
        EX: 60 * 60 * 24,
        NX: true
      });
      resolve(true);
    } catch (error) {
      Logger.error(error);
      resolve(true);
    }
  });
};

// get data from redis db
const get = (key: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await client.GET(key);
      resolve(data);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
};

// remove key from redis db
const remove = (key: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      await client.DEL(key);
      resolve(true);
    } catch (error) {
      Logger.error(error);
      reject(error);
    }
  });
};

export const RedisClient = { save, get, remove };
export default client;
