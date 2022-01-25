import { env } from './../../main/env'
import Redis from 'ioredis'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RedisConnection {
  private static connection?: Redis.Redis

  private constructor () {}

  static getClient (): Redis.Redis {
    if (RedisConnection.connection == null) {
      RedisConnection.connection = new Redis(Number(env.redis.port), env.redis.host)

      RedisConnection.connection.on('error', (err: any) => {
        console.log('Redis error: ', err)
      })
    }
    return RedisConnection.connection
  }
}
