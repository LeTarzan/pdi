import { RedisRepository } from './../../redis/index'
import { LoadUserByEmailRepository } from '../../../data/contracts/load-user-by-email-repository'
import { PgUser } from '../entities/user'
import { PgRepository } from './repository'

type LoadResult = LoadUserByEmailRepository.Result
type LoadParams = LoadUserByEmailRepository.Params

export class PgUserRepository extends PgRepository implements LoadUserByEmailRepository {
  private readonly pgUserRepo = this.getRepository(PgUser)
  private readonly cache = new RedisRepository()

  async loadByEmail ({ email }: LoadParams): Promise<LoadResult> {
    const cachedUser = await this.cache.get<LoadResult>({ key: email })

    if (cachedUser != null) return cachedUser

    const pgUser = await this.pgUserRepo.findOne({ email: email })

    if (pgUser != null) {
      const user = {
        id: pgUser.id,
        name: pgUser.name,
        email: pgUser.email
      }

      await this.cache.set({ key: 'email', value: user })

      return user
    }
  }
}
