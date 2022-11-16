import { RedisRepository } from './../../redis/index'
import { LoadUserByEmailRepository } from '../../../data/contracts/load-user-by-email-repository'
import { PgUser } from '../entities/user'
import { PgRepository } from './repository'
import { logInfo } from '../../../infra/logger'

type LoadResult = LoadUserByEmailRepository.Result
type LoadParams = LoadUserByEmailRepository.Params

export class PgUserRepository extends PgRepository implements LoadUserByEmailRepository {
  async loadByEmail ({ email }: LoadParams): Promise<LoadResult> {
    const cache = new RedisRepository()
    const pgUserRepo = await this.getRepository(PgUser)

    logInfo('trying get user in cache by email')

    const cachedUser = await cache.get<LoadResult>({ key: email })

    if (cachedUser != null) {
      logInfo('user found in cache')
      return cachedUser
    }

    logInfo('trying get user in db by email')

    const pgUser = await pgUserRepo.findOne({ email })

    if (pgUser != null) {
      logInfo('user found in db')

      const user = {
        id: pgUser.id,
        name: pgUser.name,
        email: pgUser.email
      }

      logInfo('setting user in cache')
      await cache.set({ key: 'email', value: user })

      return user
    }
  }
}
