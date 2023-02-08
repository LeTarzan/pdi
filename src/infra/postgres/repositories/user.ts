import { RedisRepository } from './../../redis/index'
import { LoadUserByEmailRepository } from '../../../data/contracts/load-user-by-email-repository'
import { User } from '../entities/user'
import { logInfo } from '../../../infra/logger'
import { PgConnection } from '../helpers'

type LoadResult = LoadUserByEmailRepository.Result
type LoadParams = LoadUserByEmailRepository.Params

const TABLE = 'users'

export class PgUserRepository implements LoadUserByEmailRepository {
  private readonly cache

  constructor () {
    this.cache = new RedisRepository()
  }

  async loadByEmail ({ email }: LoadParams): Promise<LoadResult> {
    const db = await PgConnection.getConnection()
    logInfo('trying get user in cache by email')

    const cachedUser = await this.cache.get<LoadResult>({ key: email })

    if (cachedUser != null) {
      logInfo('user found in cache')
      return cachedUser
    }

    logInfo('trying get user in db by email')

    const pgUser = await db.select().from(TABLE).where({ email })

    if (pgUser != null) {
      logInfo('user found in db')
      const user: User = pgUser[0]

      logInfo('setting user in cache')
      await this.cache.set({ key: 'email', value: user })

      return user
    }
  }
}
