import { RedisRepository } from './../../redis/index'
import { LoadUserByEmailRepository } from '../../../data/contracts/load-user-by-email-repository'
import { PgUser } from '../entities/user'
import { PgRepository } from './repository'

type LoadResult = LoadUserByEmailRepository.Result
type LoadParams = LoadUserByEmailRepository.Params

export class PgUserRepository extends PgRepository implements LoadUserByEmailRepository {
  async loadByEmail ({ email }: LoadParams): Promise<LoadResult> {
    const cache = new RedisRepository()
    const pgUserRepo = await this.getRepository(PgUser)

    const cachedUser = await cache.get<LoadResult>({ key: email })

    if (cachedUser != null) return cachedUser

    const pgUser = await pgUserRepo.findOne({ email })

    if (pgUser != null) {
      const user = {
        id: pgUser.id,
        name: pgUser.name,
        email: pgUser.email
      }

      await cache.set({ key: 'email', value: user })

      return user
    }
  }
}
