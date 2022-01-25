import { RedisRepositoy, RedisSet, RedisGet } from '../../data/contracts'
import { RedisConnection } from './connection'

const ONE_HOUR = 3600

export class RedisRepository implements RedisRepositoy {
  private readonly client = RedisConnection.getClient()

  async set (params: RedisSet.Params): Promise<RedisSet.Result> {
    await this.client.set(params.key, params.value, 'EX', ONE_HOUR)
  }

  async get<T>(params: RedisGet.Params): Promise<T> {
    return await this.client.get(params.key) as unknown as T
  }
}
