import { env } from '../../main/config/env'
import Redis from 'ioredis'
import { logError } from '../../infra/logger'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RedisConnection {
  private static connection?: Redis.Redis

  private constructor () {}

  static getClient (): Redis.Redis {
    if (RedisConnection.connection == null) {
      RedisConnection.connection = new Redis(Number(env.redis.PORT), env.redis.HOST)

      RedisConnection.connection.on('error', (error: any) => {
        logError(error)
      })
    }
    return RedisConnection.connection
  }
}
