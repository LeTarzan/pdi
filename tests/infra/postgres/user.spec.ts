import { MockProxy, mock } from 'jest-mock-extended'
import { PgUserRepository } from './../../../src/infra/postgres/repositories/user'
import { PgUser } from './../../../src/infra/postgres/entities/user'

import { getConnection, getRepository, Repository } from 'typeorm'
import { IBackup } from 'pg-mem'
import { makeFakeDb } from './config'
import { RedisRepositoy } from '../../data/contracts'

const VALID_EMAIL = 'valid_email@mail.com'

const EXPECTED_RESULT = {
  id: 1,
  name: 'valid_name',
  email: VALID_EMAIL
}

describe('PgUserRepository', () => {
  describe('loadByEmail', () => {
    let sut: PgUserRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup
    let cache: MockProxy<RedisRepositoy>

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
      sut = new PgUserRepository()
      cache = mock<RedisRepositoy>()
    })

    beforeEach(() => {
      backup.restore()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it.each([
      [VALID_EMAIL, null, EXPECTED_RESULT],
      [VALID_EMAIL, EXPECTED_RESULT, EXPECTED_RESULT]
    ])(
      'when email is %s and the cache is %o, should returns %o',
      async (email, cacheResult, expectedResult) => {
        await pgUserRepo.save({
          name: 'valid_name',
          email
        })
        cache.get.mockResolvedValueOnce(cacheResult)

        const user = await sut.loadByEmail({ email })

        expect(user).toStrictEqual(expectedResult)
      })

    it('should return undefined user\'s email not exists', async () => {
      const user = await sut.loadByEmail({ email: VALID_EMAIL })

      expect(user).toBeUndefined()
    })
  })
})
